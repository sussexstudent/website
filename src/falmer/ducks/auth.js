import { takeEvery, call, put } from 'redux-saga/effects';

function apiGetToken() {
  return fetch('/auth/token/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': window.CSRF,
    },
    credentials: 'include',
  }).then(res => res.json());
}

function saveToken(token) {
  localStorage.setItem('token', token);
}

function api(method, path) {
  const token = localStorage.getItem('token');
  return fetch(path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}

function apiGetClientData() {
  return api('GET', '/auth/me/');
}

// Actions
const REQUEST_AUTH_TOKEN = 'REQUEST_AUTH_TOKEN';
const SUCCESS_AUTH_TOKEN = 'SUCCESS_AUTH_TOKEN';
const CLIENT_DATA_SUCCESS = 'CLIENT_DATA_SUCCESS';

// Reducer
export default function reducer(
  state = {
    authToken: null,
    user: null,
  },
  action = {}
) {
  switch (action.type) {
    case SUCCESS_AUTH_TOKEN: {
      return {
        ...state,
        authToken: action.payload.token,
      };
    }
    case CLIENT_DATA_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    default:
      return state;
  }
}

// Action Creators
export function requestAuthToken() {
  return {
    type: REQUEST_AUTH_TOKEN,
  };
}

// Async IO
function* getClientData() {
  try {
    const res = yield call(apiGetClientData);

    yield put({
      type: CLIENT_DATA_SUCCESS,
      payload: {
        user: res,
      },
    });
  } catch (e) {
    console.log('error getting client data');
  }
}

function* getAuthToken() {
  try {
    const res = yield call(apiGetToken);
    yield call(saveToken, res.token);
    yield put({
      type: SUCCESS_AUTH_TOKEN,
      payload: {
        token: res.token,
      },
    });
    yield* getClientData();
  } catch (e) {
    console.error('error with getting token');
  }
}

export function* saga() {
  yield takeEvery(REQUEST_AUTH_TOKEN, getAuthToken);
}

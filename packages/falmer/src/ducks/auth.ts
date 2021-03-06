import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { apiQuery } from './utils';

function apiGetToken() {
  return fetch('/auth/token/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': (window as any).CSRF,
    },
    credentials: 'include',
  }).then((res) => res.json());
}

function saveToken(token: string) {
  localStorage.setItem('token', token);
}

function apiGetClientData() {
  return apiQuery(`
    query {
      viewer {
        name
        identifier
        isStaff
        hasCmsAccess
        permissions
      }
    }
  `);
}

// Actions
const REQUEST_AUTH_TOKEN = 'REQUEST_AUTH_TOKEN';
const SUCCESS_AUTH_TOKEN = 'SUCCESS_AUTH_TOKEN';
const CLIENT_DATA_SUCCESS = 'CLIENT_DATA_SUCCESS';
const NOT_LOGGED_IN = 'NOT_LOGGED_IN';

// Reducer
export default function reducer(
  state = {
    authToken: null,
    user: null,
    loading: true,
  },
  action: AnyAction,
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
        loading: false,
      };
    }
    case NOT_LOGGED_IN: {
      return {
        ...state,
        user: null,
        loading: false,
      };
    }
    default:
      return state;
  }
}

// Action Creators
export const requestAuthToken = () => {
  return {
    type: REQUEST_AUTH_TOKEN,
  };
};

// Async IO
function* getClientData() {
  try {
    const res = yield call(apiGetClientData);

    yield put({
      type: CLIENT_DATA_SUCCESS,
      payload: {
        user: res.data.viewer,
      },
    });
  } catch (e) {
    yield put({ type: NOT_LOGGED_IN });
  }
}

function* getAuthToken() {
  try {
    const res = yield call(apiGetToken);
    if (res.token) {
      yield call(saveToken, res.token);
      yield put({
        type: SUCCESS_AUTH_TOKEN,
        payload: {
          token: res.token,
        },
      });
      yield* getClientData();
    } else {
      throw new Error('failed to get token');
    }
  } catch (e) {
    yield put({ type: NOT_LOGGED_IN });
  }
}

export function* saga() {
  yield takeEvery(REQUEST_AUTH_TOKEN, getAuthToken);
}

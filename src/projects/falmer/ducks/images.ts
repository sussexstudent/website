import { takeEvery, call, put, select } from 'redux-saga/effects';
import { apiQuery } from '~falmer/ducks/utils';
import { AnyAction } from 'redux';
import produce from 'immer';

const REQUEST_IMAGE = 'REQUEST_IMAGE';
const REQUEST_IMAGE_STARTED = 'REQUEST_IMAGE_STARTED';
const REQUEST_SUCCESS_IMAGE = 'SUCCESS_IMAGE';
// const REQUEST_FAILURE_IMAGE = 'REQUEST_FAILURE_IMAGE';

export const requestImage = (id: number) => ({
  type: REQUEST_IMAGE,
  payload: id,
});

export default function reducer(
  state: { images: { [key: number]: any } } = {
    images: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case REQUEST_SUCCESS_IMAGE: {
      return produce(state, (draft) => {
        draft.images[action.payload.mediaId] = action.payload;
        draft.images[action.payload.mediaId].loaded = true;
      });
    }
    case REQUEST_IMAGE_STARTED: {
      return produce(state, (draft) => {
        draft.images[action.payload] = {
          loading: true,
          mediaId: action.payload,
        };
      });
    }

    default:
      return state;
  }
}

function apiGetImage(id: number) {
  return apiQuery(`query image {
    image(mediaId: ${id}) {
      mediaId
      resource
      width
      height
  }}`);
}

function* getImage(d: any) {
  try {
    const requestNotNeeded = yield select((state) => {
      const data = state.images.images[d.payload];

      return data && (data.loading || data.loaded);
    });

    if (!requestNotNeeded) {
      yield put({
        type: REQUEST_IMAGE_STARTED,
        payload: d.payload,
      });

      const res = yield call(apiGetImage, d.payload);
      console.log('requested image', res);

      yield put({
        type: REQUEST_SUCCESS_IMAGE,
        payload: res.data.image,
      });
    }
  } catch (e) {
    console.error('failure getting image');
  }
}

export function* saga() {
  yield takeEvery(REQUEST_IMAGE, getImage);
}

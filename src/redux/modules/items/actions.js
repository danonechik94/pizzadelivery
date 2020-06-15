import T from './types';

// TODO remove in prod
import sleep from 'utility/sleep';
import { FULL_ITEMS_LIST } from './mocks';

export default () => {
  return function(dispatch) {
    return dispatch({
      promise: async () => {
        await sleep(2000);

        return FULL_ITEMS_LIST
      },
      types: [T.ITEMS_FETCH, T.ITEMS_FETCH_SUCCESS, T.ITEMS_FETCH_FAIL],
    });
  };
}

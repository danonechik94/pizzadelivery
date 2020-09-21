import T from './types';
import superagent from 'superagent';

// TODO remove in prod
import sleep from 'utility/sleep';
import { FULL_ITEMS_LIST } from './mocks';

export default () => {
  return function(dispatch) {
    return dispatch({
      promise: async () => {
        const res = await superagent
          .get('/_api/get_items')
          .set('Accept', 'application/json');

        if (res && res.body) {
          return res.body;
        } else {
          return Promise.reject();
        }
        // await sleep(2000);

        // return FULL_ITEMS_LIST
      },
      types: [T.ITEMS_FETCH, T.ITEMS_FETCH_SUCCESS, T.ITEMS_FETCH_FAIL],
    });
  };
}

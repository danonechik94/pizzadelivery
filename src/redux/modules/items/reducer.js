import T from './types';
import { withData as loader } from 'utility/loader';

const initialState = {
  ...loader.initial(),
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.ITEMS_FETCH: {
      return {
        ...state,
        ...loader.begin(),
      };
    }

    case T.ITEMS_FETCH_SUCCESS: {
      return {
        ...state,
        ...loader.success(action.result),
      };
    }

    case T.ITEMS_FETCH_RESET: {
      return {
        ...state,
        ...loader.initial(),
      };
    }

    case T.ITEMS_FETCH_FAIL: {
      return {
        ...state,
        ...loader.error(action.error),
      };
    }

    default: {
      return state;
    }
  }
};
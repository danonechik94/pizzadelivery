import T from './types';

const initialState = {
  showAuth: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case T.SHOW_MODAL: {
      return {
        ...state,
        showAuth: true,
      };
    }

    case T.HIDE_MODAL: {
      return {
        ...state,
        showAuth: false,
      };
    }

    default: {
      return state;
    }
  }
};
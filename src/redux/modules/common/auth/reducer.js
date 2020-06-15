import T from './types';
import { withData as loader } from 'utility/loader';

const initialState = {
  ...loader.initial(),
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
import T from './types';

export const showAuth = () => {
  return {
    type: T.SHOW_MODAL
  }
};

export const hideAuth = () => {
  return {
    type: T.HIDE_MODAL
  }
};
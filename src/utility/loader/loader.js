const status = {
  initial: false,
  loading: false,
  success: false,
  error: false,
  cancelled: false
};

const initial = () => ({ ...status, initial: true });
const begin = () => ({ ...status, loading: true });
const success = () => ({ ...status, success: true });
const error = (err = true) => {
  return {...status, error: err}
};

const cancelled = () => ({...status, cancelled: true});

module.exports = {
  initial,
  begin,
  success,
  error,
  cancelled,
  withData: {
    initial(data = undefined) {
      return {
        ...initial(),
        data,
      };
    },
    begin(data = undefined) {
      return {
        ...begin(),
        data,
      };
    },
    success(data) {
      return {
        ...success(),
        data
      };
    },
    error(err) {
      return {
        ...error(err),
        data: undefined
      };
    }
  }
};

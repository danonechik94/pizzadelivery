const promiseSeries = require('utility/promiseSeries');
const extractErrorFromRes = (error, extractError) => {
  if (!extractError) {
    return error;
  }
  if (!error) {
    return error;
  }
  if (error.response) {
    error = error.response;
  }
  if (error.body) {
    error = error.body;
  }
  if (error.error) {
    error = error.error;
  }
  if (error.msg && !error.message) {
    error.message = error.msg;
  }
  return error;
};

const processPromise = (getPromise, next, types, extractError, propagateError, rest) => {
  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...rest, type: REQUEST });

  const catchError = error => {
    console.error('MIDDLEWARE ERROR:', error);
    error = extractErrorFromRes(error, extractError);
    next({ ...rest, error, type: FAILURE });
    return error;
  };
  const resolved = result => {
    next({ ...rest, result, type: SUCCESS });
    return result;
  };
  const rejected = error => {
    error = extractErrorFromRes(error, extractError);
    next({ ...rest, error, type: FAILURE });
    return error;
  };

  const promise = getPromise();

  promise
    .catch(e => {
      if (e instanceof Error) {
        if (__DEV__) {
          console.error(e);
        } else if (global.trackJs) {
          if (e && e.response && e.response.statusCode && e.response.statusCode < 500) {
            global.trackJS.console && global.trackJS.console.info && global.trackJS.console.info(e); // eslint-disable-line no-unused-expressions
            return;
          }
          global.trackJs.track(e);
        }
      }
    });

  const middlewarePromise = promise
    .then(resolved, rejected)
    .catch(catchError);

  if (propagateError) {
    return promise.then(x => x, error => Promise.reject(extractErrorFromRes(error, extractError)));
  } else {
    return middlewarePromise;
  }
};

module.exports = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promises, promise, types, extractError, propagateError, ...rest } = action;
  if (promises) {
    const list = promises.map(function (promiseFn) {
      return (result) => {
        const { promise, types, ...rest } = promiseFn(result);
        return processPromise(promise, next, types, extractError, propagateError, rest);
      };
    });
    return promiseSeries(list);
  }
  if (!promise) {
    return next(action);
  }

  return processPromise(promise, next, types, extractError, propagateError, rest);
};

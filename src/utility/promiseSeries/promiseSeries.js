module.exports = function promiseSeries(list) {
    var p = Promise.resolve();
    return list.reduce(function (pacc, fn) {
      return pacc.then(fn);
    }, p);
  };
  
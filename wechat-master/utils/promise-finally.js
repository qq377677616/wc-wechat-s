const promiseFinally = () => {
  console.log(777)
  Promise.prototype.finally = function (callback) {
    let Promise = this.constructor
    return this.then(
      function (value) {
        Promise.resolve(callback()).then(
          function () {
            return value
          }
        )
      },
      function (reason) {
        Promise.resolve(callback()).then(
          function () {
            throw reason
          }
        )
      }
    )
  }
}

module.exports = { promiseFinally }

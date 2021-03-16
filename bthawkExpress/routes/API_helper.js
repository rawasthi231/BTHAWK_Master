const request = require('request')
module.exports = {
  /*
  ** This method returns a promise
  ** which gets resolved or rejected based
  ** on the result from the API
  */
  apiCall : function (url, body) {
    return new Promise((resolve, reject) => {
      let options = {
        url: url,
        json: true,
        body: body
      }
      
      // let options = {
      //   url: url,
      //   json: true,
      //   body: {
      //     name : "Raghav"
      //   }
      // }
      
      request.post(options, (err, res, body) => {
        if (err) reject(err)
        resolve(body)
      });
    })
  }
}
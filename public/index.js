/*
 * @Description: 
 * @Author: doctor
 * @Date: 2019-06-27 09:29:59
 * @LastEditTime: 2019-06-28 16:45:00
 * @LastEditors: doctor
 */
registerServiceWorker('./sw.js')
function registerServiceWorker(file) {
  return navigator.serviceWorker.register(file);
}
var app = (function () {
  const baseUrl = "httt://127.0.0.1:3001"
  function Request() {
    this.get = function (url) {
      return new Promise((resolve,reject)=>{
      let requestUrl = baseUrl + url
      fetch(requestUrl, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          mode: "cors"
        })
      .then(res=>{
        return res.json();
      }).then(res=>{
        return res;
      })
    })
  }
    this.post = function (url,params) {
      return new Promise((resolve,reject)=>{
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(params)
          })
        .then(res=>{
          return res.json();
        }).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  }
  return {
    request : new Request()
  }
})(window)

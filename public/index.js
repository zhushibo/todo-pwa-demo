
/*
 * @Description: 
 * @Author: doctor
 * @Date: 2019-06-27 09:29:59
 * @LastEditTime: 2019-07-02 09:42:53
 * @LastEditors: doctor
 */

function registerServiceWorker(file) {
  return navigator.serviceWorker.register(file);
}
var app = (function () {
  const baseUrl = "httt://127.0.0.1:3002"
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
  function getApiDataFromCache(url) {
    if ('caches' in window) {
        return caches.match(url).then(function (cache) {
            if (!cache) {
                return;
            }
            return cache.json();
        });
    }
    else {
        return Promise.resolve();
    }
  }
  return {
    request : new Request(),
    getCacheData:getApiDataFromCache
  }
})(window)


 /**
     * 用户订阅相关的push信息
     * 会生成对应的pushSubscription数据，用于标识用户与安全验证
     * 主意！！！ chorme需要翻墙
     * @param {ServiceWorker Registration} registration
     * @param {string} publicKey 公钥
     * @return {Promise}
     */
    function subscribeUserToPush(registration, publicKey) {
      console.log(registration.subscribe,'registration')
      var subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: window.utils.urlBase64ToUint8Array(publicKey)
      }; 
      console.log(subscribeOptions)
      return registration.pushManager.subscribe(subscribeOptions)
  }
  function sendSubscriptionToServer(body, url) {
    url = url || '/subscription';
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 60000;
        xhr.onreadystatechange = function () {
            var response = {};
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    response = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    response = xhr.responseText;
                }
                resolve(response);
            }
            else if (xhr.readyState === 4) {
                resolve();
            }
        };
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  var publicKey = 'BGGDzl4e9P_m6kj0RQ2JFHkNSbbD4d-3Zbu9qmXtb6a69YQ1XQmJsSWVZ-72DWQxeG7QmjU3e56cY0W6Cvt4YBA';
  // 注册service worker
  registerServiceWorker('./sw.js').then(function (registration) {
      console.log('Service Worker 注册成功');
      // 开启该客户端的消息推送订阅功能
      return subscribeUserToPush(registration, publicKey)
  }).then(function (subscription) {
      console.log(subscription,subscription.endpoint)
      var body = {subscription: subscription};
      // 为了方便之后的推送，为每个客户端简单生成一个标识
      body.uniqueid = new Date().getTime();
      console.log('uniqueid', body.uniqueid);
      // 将生成的客户端订阅信息存储在自己的服务器上
      return sendSubscriptionToServer(JSON.stringify(body));
  }).then(function (res) {
      console.log(res,'订阅信息');
  }).catch(err=>{
    console.log(err)
  })
}

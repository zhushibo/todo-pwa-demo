/*
 * @Description: 
 * @Author: doctor
 * @Date: 2019-06-29 10:07:14
 * @LastEditTime: 2019-07-01 12:15:53
 * @LastEditors: doctor
 */
let utils = {
  GetUrlRelativePath:function (url) {
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if(relUrl.indexOf("?") != -1){
      relUrl = relUrl.split("?")[0];
　　}
　　  return relUrl;
  },
  urlBase64ToUint8Array:function (base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
window.utils = utils
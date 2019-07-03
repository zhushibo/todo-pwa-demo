/*
 * @Description: 
 * @Author: doctor
 * @Date: 2019-06-22 10:02:14
 * @LastEditTime: 2019-07-02 21:47:05
 * @LastEditors: doctor
 */
const public = require('koa-router')()
const util = require('../../utils/ws')

const webpush = require('web-push');
/* ===================== */
/* 使用web-push进行消息推送 */
/* ===================== */
const options = {
     //proxy: 'http://localhost:3002' // 使用FCM（Chrome）需要配置代理 ,firefox不需要
};

/**
 * VAPID值
 * 这里可以替换为你业务中实际的值
 */
const vapidKeys = {
    publicKey: 'BGGDzl4e9P_m6kj0RQ2JFHkNSbbD4d-3Zbu9qmXtb6a69YQ1XQmJsSWVZ-72DWQxeG7QmjU3e56cY0W6Cvt4YBA',
    privateKey: 'PvL6G4YKs8S1fOcxTZ1g_HS2Ol4d5vZmZsybnbXFKoA'
};

// 设置web-push的VAPID值
webpush.setVapidDetails(
    'mailto:804812500@qq.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
function pushMessage(subscription, data = {}) {
    console.log('开始发送消息',subscription)
    webpush.sendNotification(subscription, data, options).then(data => {
      console.log(123123)
        console.log('push service的相应数据:', JSON.stringify(data));
        return;
    }).catch(err => {
      console.log(err,'err')
        // 判断状态码，440和410表示失效
        if (err.statusCode === 410 || err.statusCode === 404) {
            return util.remove(subscription);
        }
        else {
            console.log(subscription);
            console.log(err);
        }
    })
}
// public.get('/',async (ctx)=>{
//   ctx.body = '首页';
// });
public.post('/subscription', async ctx => {
  let body = ctx.request.body;
  await util.saveRecord(body);
  ctx.response.body = {
      status: 0
  };
});
public.post('/push', async ctx => {
  let {uniqueid, payload} = ctx.request.body;
  let list = uniqueid ? await util.find({uniqueid}) : await util.findAll();
  console.log(uniqueid,await util.find({uniqueid}))
  let status = list.length > 0 ? 0 : -1;

  for (let i = 0; i < list.length; i++) {
      let subscription = list[i].subscription;
      pushMessage(subscription, JSON.stringify(payload));
  }

  ctx.response.body = {
      status
  };
});
module.exports = public
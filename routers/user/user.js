/*
 * @Description: user controller
 * @Author: doctor
 * @Date: 2019-06-22 10:02:30
 * @LastEditTime: 2019-06-28 18:08:38
 * @LastEditors: doctor
 */
const user = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const { login } = require('../../controller/user')
const { add , list} = require('../../controller/todo')
const loginCheck = require('../../middleware/loginCheck')

user.prefix('/api/user')

user.post('/login',async function(ctx,next){
  const {username,password} = ctx.request.body
  const data = await login(username,password)
  if(data){
    ctx.session.username = data.username
    ctx.session.nickname = data.nickname
    ctx.session.created_time = data.created_time
    let userInfo = {
      nickname:data.nickname,
      created_time:data.created_time
    }
    ctx.body = new SuccessModel(userInfo,'login ok')
  }else{
    ctx.body = new ErrorModel('login faild')
  }
})

user.get('/login',async (ctx)=>{
  ctx.body = '登录页面';
});

user.post('/addTodo',async(ctx)=>{
  const params = ctx.request.body
  const result = await add(params)
  ctx.body = new SuccessModel('login ok')
})

user.post('/list',async(ctx)=>{
  const result = await list()
  ctx.body = new SuccessModel(result,'login ok')
})

user.post('/loginAction',async (ctx, next)=>{
  const {username, password} = ctx.request.body

  ctx.session.username = username
  ctx.session.password = password
});

user.get('/userCenter',loginCheck,async (ctx, next)=>{
  ctx.body = '个人中心';
});
module.exports = user
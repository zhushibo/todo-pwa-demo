/*
 * @Description: 
 * @Author: dotor
 * @Date: 2019-06-23 21:39:32
 * @LastEditTime: 2019-06-24 18:31:58
 * @LastEditors: doctor
 */

const { exec, escape } = require('../db/mysql')
const { saltHashPassword } = require('../utils/crypto')

const user = module.exports
// 新增用户
user.addUser = async(username,password,nickname) =>{
  username = escape(username)
  password = escape(password)
  nickname = escape(nickname)

  let {salt,passwordHash} = saltHashPassword(password)
  let sql = `
    insert into users (username,password,salt,nickname) values (${username},'${passwordHash}','${salt}',${nickname})
    `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

// 用户登录
user.login = async(username,password)=>{
  username = escape(username)
  password = escape(password)

  let sql = `
    select * from users where username = ${username}
  `
  const data = await exec(sql)
  if(data.length){
    let {passwordHash} = saltHashPassword(password,data[0].salt)
    if(passwordHash === data[0].password){
      return data[0]
    }
  }
  return
}
//添加一个用户
//user.addUser('1138','046512','doctor')
/*
 * @Description: todo controller
 * @Author: doctor
 * @Date: 2019-06-23 22:28:12
 * @LastEditTime: 2019-06-28 16:30:07
 * @LastEditors: doctor
 */
const moment = require('moment')
const { exec } = require('../db/mysql')

const todo = module.exports

todo.add = async( params ) =>{
  // repeatType  1=> 每天 2=>工作日 3=>一次性
  const {taskname,mark,repeat_type,notificate_time} = params
  let date = moment()
  let current_time = date.format('YYYY-MM-DD HH:mm:ss')
  
  let sql = `
  insert into task (name,mark,repeat_type,notificate_time,created_time) values('${taskname}','${mark}',${repeat_type},'${notificate_time}','${current_time}')`
  console.log(sql)
  let insert = await exec(sql)
  return {
    insert_id : insert.insertId
  }
}
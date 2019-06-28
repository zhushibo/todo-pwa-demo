/*
* @Author: doctor
* @Date: 2019-06-23
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const mysql = require('mysql')
const { MYSQL_CONF }  = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

function exec(sql){
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            console.log(`mysql.result : ${result}`)
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}
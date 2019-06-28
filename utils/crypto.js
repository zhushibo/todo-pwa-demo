/*
 * @Description: 
 * @Author: doctor
 * @Date: 2019-06-23 21:52:53
 * @LastEditTime: 2019-06-24 11:14:43
 * @LastEditors: doctor
 */
'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    // 生成加密强伪随机数据.
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
/**
 * 有salt为校验，无salt为新建
 * @param {*} userpassword
 * @param {string} [salt='']
 * @returns
 */
function saltHashPassword(userpassword,salt='') {
    var salt = salt || genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return passwordData
}

module.exports = {
  saltHashPassword
}
// saltHashPassword('MYPASSWORD');
// saltHashPassword('MYPASSWORD');
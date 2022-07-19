/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-08 11:13:59
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-08 11:15:22
 * @FilePath: \expressFrame\until\jwt_token.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require('jsonwebtoken')
const scret = 'knowledge';  //自定义秘钥  自定义
let setToken =  function(str1,str2){
    let user = str1;   //登录账号和密码作为了规则
    let paswd = str2;
    const rule = {
        username: user,
        pwd: paswd
    }
    //expiresIn:过期时间
    let ztoken =  jwt.sign(rule, scret, { expiresIn: 60*60*24 }) 
    return ztoken
}
module.exports.setToken =  setToken ;
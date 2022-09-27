/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-30 15:19:26
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-09-15 11:52:30
 * @FilePath: \expressFrame\controllers\users.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引用用户模版数据
const Users = require('../models/users.js');

const {setToken, decToken} = require('../until/jwt_token.js')

const usersController = {
 
  // showUsers 获取用户数据并返回到页面
  showUsers: async function(req,res,next){
    // 获取前端token并解密
    // let auth = req.headers.authorization;
    try{
      let userData = await Users.all()
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
  // 查询用户
  selectUsers: async function(req,res,next) {
    try{
      let condition = {name: 'userName', value: req.body.userName}
      let selectData = await Users.getAll(condition);
      if (selectData.length !== 0) {
        let tokenData = setToken(req.body.userName, req.body.password, 60*60*2);
        let refreshData = setToken(req.body.userName, req.body.password, 60*60*24*14);
        if (selectData[0].password === req.body.password) {
          res.json({
            code: 200,
            message: "登录成功",
            data: {'token': tokenData, 'refresh_token': refreshData}
          })
        } else {
          res.json({ code: 2, message: "密码错误，请重试", data: [] })
        }
      } else {
        res.json({ code: 2, message: "用户不存在，请注册", data: [] })
      }
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
  // 添加用户
  setUsers: async function(req,res,next) {
    // {userName: '', password: '', nickName: '' }
    // 需要前端限制密码不能有汉字及表情
    let obj = req.body;
    obj.nickName = new Date().getTime();
    try{
      let condition = {name: 'userName', value: obj.userName};
      let isUser = await Users.getAll(condition);
      if ('01234567890'.includes(obj.password.toString())) {
        res.json({ code: 11, message: "密码过于简单", data: [] })
      }else if (isUser.length === 0) {
        await Users.insert(obj);
        res.json({
          code: 200,
          message: "注册成功"
        })
      } else {
        res.json({ code: 12, message: "用户名重复", data: [] })
      }
      
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  }
  
}

module.exports = usersController;
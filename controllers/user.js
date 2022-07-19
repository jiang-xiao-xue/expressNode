/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-16 17:32:58
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-04 16:54:02
 * @FilePath: \expressFrame\controllers\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引用用户模版数据
const User = require('../models/user.js');

const userController = {
  // showUser 获取用户数据并返回到页面
  showUser: async function(req,res,next){
    try{
      let userData = await User.all()
      res.json({
        code: 200,
        message: "操作成功",
        data: userData
      })
    }catch(e){
      res.json({ code: 0, message: "操作失败", data: e })
    }
  },
}

module.exports = userController;



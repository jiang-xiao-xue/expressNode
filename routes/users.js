/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-15 17:11:51
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-30 15:40:33
 * @FilePath: \expressFrame\routes\users.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

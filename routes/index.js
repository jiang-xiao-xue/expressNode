/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-15 17:11:51
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-04 17:49:49
 * @FilePath: \expressFrame\routes\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
// let bodyParser = require('body-parser');
const userController = require('../controllers/user');
const usersController = require('../controllers/users');
// 解析提交的json参数
// let jsonParser = bodyParser.json();

// 解析提交的form表单参数
// let urlencodedParser = bodyParser.urlencoded({ extended: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get_user', userController.showUser);
router.post('/login', usersController.selectUsers);
router.post('/sigin', usersController.setUsers);
module.exports = router;

/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-30 15:07:53
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-30 15:27:12
 * @FilePath: \expressFrame\models\users.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Base = require('./base');

class Users extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'users'){
    super(props);
  }
}

module.exports = new Users();
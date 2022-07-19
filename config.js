/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-16 17:22:53
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-16 17:24:17
 * @FilePath: \expressFrame\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const configs = {
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',  // 自己设置的密码
    database: 'express' // 数据库的名字
  },
  // 打印错误
  log: {
    error (message) {
      console.log('[knex error]', message)
    }
  }
}

module.exports = configs
/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-16 17:30:10
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-05 15:08:20
 * @FilePath: \expressFrame\models\base.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const knex = require('../models/knex');

class Base{
  constructor(props){
    this.table = props;
  }

  // 查找
  all (){
    return knex(this.table).select();
  }
  // 按条件查找
  // condition {name: '', value: null}
  getAll(condition) {
    if (condition) {
      return knex(this.table).where(condition['name'], '=', condition['value']).select();
    } else {
      return knex(this.table).select();
    }
  }
  // 新增
  insert (params){
    return knex(this.table).insert(params);
  }

  // 更改
  update (id, params){
    return knex(this.table).where('id', '=', id).update(params);
  }

  // 删除
  delete (id){
    return knex(this.table).where('id', '=', id).del();
  }

}

module.exports = Base;

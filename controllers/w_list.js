/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-09-15 11:15:36
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-09-15 16:46:34
 * @FilePath: \expressNode\controllers\w_list.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const http = require('https');
const url = require('url');

var listUrl = 'https://m.weibo.cn/api/config/list';
var trendUrl = 'https://m.weibo.cn/api/feed/trendtop';
const listController = {
  getList: async function(req,resu,next) {
    try {
      await http.get(listUrl, (res) => {
        let listData = "";
            res.on('data',(chunk) => {
              listData += chunk;
            });
            res.on('end', function() {
              let json = JSON.parse(listData);
              resu.json({
                code: 200,
                message: "操作成功",
                data: json
              })
            })
      }).on('error', () => {
          console.log('数据出错');
      })
    } catch(e) {
      resu.json({ code: 0, message: "操作失败", data: e })
    }
   
  },
  getTrend: async function(req, resu, next) {
    try {
      await http.get(trendUrl+"?containerid="+req.query.containerid, (res) => {
        let trendData = '';
        res.on('data', (chunk) => {
          trendData += chunk;
        });
        res.on('end', function() {
          let json = JSON.parse(trendData);
              resu.json({
                code: 200,
                message: "操作成功",
                data: json
              })
        });
      }).on('error', () => {
        console.log('数据出错');
      })
    } catch(e) {
      resu.json({ code: 0, message: "操作失败", data: e })
    }
  }
}
module.exports =  listController;




/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-11-22 14:36:20
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-11-23 10:39:48
 * @FilePath: \login\js\component.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
(function() {
  // 这句必须，引入httpVueLoader的；
  Vue.use(httpVueLoader);
  var vue = new Vue({
      // el: '#app',
      // data() {
      //     return {
      //       data () {
      //         return {
      //         }
      //       }
      //     }
      // },
      // components里面，引入组件
      // 组件必须与html文件在同一目录下，不然下边的写法，会引入失败；
      components: {
          'Indentify': 'url:indentify.vue?v=' + (new Date().getTime()),
          'sigin-in': 'url:siginin.vue?v=' + (new Date().getTime()),
      },
  });
})();
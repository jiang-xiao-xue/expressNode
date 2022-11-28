<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-11-23 11:26:22
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-11-28 15:43:12
 * @FilePath: \login\setpassword.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="h-setpassword">
    <div class="form-num" v-if="isPhone">
      您注册的<span v-if="getData.type === 'phone'">手机</span><span v-if="getData.type === 'email'">邮箱</span>号为{{getData.num}}
    </div>
    <div class="form-num" v-else>
      请输入设置的密码
    </div>
    <div class="form-pass" :class="{'form-error': firstNumError}">
      <input v-if="openEyefirst" type="text" v-model="firstNum" placeholder="设置密码" @blur="getPasswordCorrect(firstNum)">
      <input v-if="!openEyefirst" type="password" v-model="firstNum" placeholder="设置密码" @blur="getPasswordCorrect(firstNum)">
      <div class="eye" @click="openEyefirst = !openEyefirst">
        <img v-if="openEyefirst" src="http://leishen.oss-cn-qingdao.aliyuncs.com/activity_m/thunderobot/login/openEye.png" alt="">
        <img v-if="!openEyefirst" style="width: 27px; height: 12px" src="http://leishen.oss-cn-qingdao.aliyuncs.com/activity_m/thunderobot/login/closeEye.png" alt="">
      </div>
    </div>
    <div class="error-tip" v-if="firstNumError">{{firstNumError}}</div>
    <div class="form-pass" :class="{'form-error': lastNumError}">
      <input v-if="openEyelast" type="text" v-model="lastNum" placeholder="再次确认密码" :disabled="!firstNum" @blur="confirmPass(lastNum)">
      <input v-if="!openEyelast" type="password" v-model="lastNum" placeholder="再次确认密码" :disabled="!firstNum" @blur="confirmPass(lastNum)">
      <div class="eye" @click="openEyelast = !openEyelast">
        <img v-if="openEyelast" src="http://leishen.oss-cn-qingdao.aliyuncs.com/activity_m/thunderobot/login/openEye.png" alt="">
        <img v-if="!openEyelast" style="width: 27px; height: 12px" src="http://leishen.oss-cn-qingdao.aliyuncs.com/activity_m/thunderobot/login/closeEye.png" alt="">
      </div>
    </div>
    <div class="error-tip" v-if="lastNumError">{{lastNumError}}</div>
    <div class="form-title">密码规则：</div>
    <div class="form-title">1、密码不能包含中文和空格！</div>
    <div class="form-title">2、密码不能小于6位或大于20位！</div>
    <div class="form-title">3、密码至少包含字母/数字/字符两种组合!</div>
    <button class="form-submit" :disabled="!firstNum || !lastNum" :class="{'btn-disabled':!firstNum || !lastNum}" @click="handleNext">下一步</button>
  </div>
</template>
<script type="text/babel">
module.exports = {
  name: 'set-password', // 设置密码
  props: {
    isPhone: {
      type: Boolean | String,
      default: true
    },
    getData: {
      type: Object,
      default: {}
    }
  },
  data: function() {
    return {
      // phoneNum: '', // 手机号
      firstNum: '', // 设置密码
      lastNum: '', // 确认密码
      firstNumError: '', //设置密码错误提示
      lastNumError: '', // 确认密码错误提示
      openEyefirst: false, // 是否显示密码
      openEyelast: false,
    }
  },
  methods: {
    // 验证密码格式正确性(设置密码)
    getPasswordCorrect: function (number) { 
      this.firstNumError= '';
      if (/[^\w\.\/]/ig.test(number)) {
        this.firstNumError = '密码不能包含中文和空格！';
        // this.$toast('密码不能包含中文和空格！', 'error', 3000)
        return false
      } else if (number === '') {
        this.firstNumError = '请输入密码'
        // this.$toast('请输入密码', 'error', 3000)
        return false
      } else if (number.length < 6 || number.length > 20) {
        this.firstNumError = '密码不能小于6位或大于20位';
        // this.$toast('密码小于6位或大于20位', 'error', 3000)
        return false
      } else if (!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/.test(number)) {
        this.firstNumError = '密码至少包含字母/数字/字符两种组合';
        // this.$toast('密码至少包含字母/数字/字符两种组合', 'error', 1500)
        return false
      } else {
        return true
      }
    },
    // 再次确认密码
    confirmPass: function (num) {
      this.lastNumError = '';
      if (num === '') {
        this.lastNumError = '请输入确认密码';
        return false;
      } else if (this.firstNum !== num) {
        this.lastNumError = '两次密码输入不一致'
        return false;
      } else {
        return true;
      }
    },
    // 下一步
    handleNext: function() {
      this.getPasswordCorrect(this.firstNum);
      this.confirmPass(this.lastNum);
      this.$emit('password', this.lastNum)
     
    }
  }
}
</script>
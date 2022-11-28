<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-11-23 11:10:24
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-11-28 16:43:38
 * @FilePath: \login\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="h-siginup">
    
    <!-- 地区 -->
    <div class="form-location">
      <div class="form-title">国家地区</div>
        <select name="" id="" v-model="selectCountry">
          <option v-for="(item, index) in countryData" :value="item.id" :key="index">{{item.name}}</option>
        </select>
      </div>
      <!-- 手机号 国家码 -->
      <div class="form-phone" :class="{'form-error': phoneError}" v-if="isPhoneLogin">
        <div class="form-title">国家码</div>
        <div class="country">
          <select name="" id="" v-model="selectCountry">
            <option v-for="(item, index) in countryData" :value="item.id" :key="index">{{item.value}}</option>
          </select>
          <input type="text" v-model="phoneNum" maxlength="11" placeholder="请输入手机号">
        </div>
      </div>
      <div class="error-tip" v-if="phoneError && isPhoneLogin">{{phoneError}}</div>
      <!-- 邮箱注册 -->
      <div class="form-setphone" :class="{'form-error': emailNumError}" v-if="!isPhoneLogin">
        <input type="text" v-model="emailNum" placeholder="请输入邮箱">
      </div>
      <div class="error-tip" v-if="emailNumError && !isPhoneLogin">{{emailNumError}}</div>
      <!-- 图片验证码 -->
      <div class="form-code" :class="{'form-error': identifyError}">
        <div class="code">
          <input type="text" v-model="getIdentifyCode" placeholder="请输入图片验证码" maxlength="4">
          <button @click="refreshCode">
            <Indentify :identify-code="identifyCode"/>
          </button>
        </div>
      </div>
      <div class="error-tip" v-if="identifyError">{{identifyError}}</div>
      <!-- 手机/邮箱验证码 -->
      <div class="form-code" :class="{'form-error': codeError}">
        <div class="code">
          <input type="text" v-model="codeNum" placeholder="请输入验证码" maxlength="6">
          <button :disabled="canSend" @click="captchaSent">{{content}}</button>
        </div>
      </div>
      <div class="error-tip" v-if="codeError">{{codeError}}</div>
      <div class="form-text">
        <input type="checkbox" v-model="isChecked">
        <div>已经阅读并同意雷神账号<span>用户协议</span>和<span>隐私政策</span></div>
      </div>
      <!-- 手机注册 -->
      <button class="form-submit" :disabled="!phoneNum || !codeNum || !getIdentifyCode" :class="{'btn-disabled':!phoneNum || !codeNum || !getIdentifyCode}" @click="handleRegistered" v-if="isPhoneLogin">注册</button>
      <!-- 邮箱注册 -->
      <button class="form-submit" :disabled="!emailNum || !codeNum || !getIdentifyCode" :class="{'btn-disabled':!emailNum || !codeNum || !getIdentifyCode}" @click="handleRegisteredNext" v-if="!isPhoneLogin">注册</button>
      <div class="form-tip">
        <div>收不到验证码？</div>
        <div v-if="!isPhoneLogin" @click="loginStau">手机号注册</div>
        <div v-if="isPhoneLogin" @click="loginStau">邮箱注册</div>
      </div>
  </div>
</template>
<script type="text/babel">
// 注册
// 选取了国家之后国家码不能选择（所以国家选项的id应与国家码选项的id相同）；
// 且选择其他国家首选跳转为邮箱注册（我们是否有邮箱确认，邮箱验证码的方式）；
// 其他国家 首选为邮箱注册 可选为手机号注册（但是不同国家的手机号验证规则不一样， 所以需要确定我们支持哪几个国家）
// 注册 短信的限制，小米限制三条 我们是否需要；
module.exports = {
  name: 'sigin-up', // 注册
  components: { 
    'Indentify': httpVueLoader('./indentify.vue'),
    // 'set-password': httpVueLoader('./setpassword.vue'),
  },
  data: function () {
    return {
      isPhoneLogin: true, // true: 手机号注册 false： 邮箱注册
      selectCountry: 1,
      countryData: [
        {id: 1, name: '中国', value: '+86'},
        {id: 2, name: '马来西亚', value: '+60'},
        {id: 3, name: '菲律宾', value: '+372'},
        {id: 4, name: '泰国', value: '+421'},
        {id: 5, name: '新加坡', value: '+65'},
        {id: 6, name: '俄罗斯', value: '+503'},
        {id: 7, name: '西班牙', value: '+1868'},
        {id: 8, name: '哥伦比亚', value: '+49'},
        {id: 9, name: '墨西哥', value: '+264'},
        {id: 10, name: '秘鲁', value: '+56'},
        {id: 11, name: '智利', value: '+56'},
      ],
      // selectPhone: 1, // 注册时 国家码id
      // phoneData: [ // 注册时 国家码列表
      //   {id: 1, value: '+86'},
      //   {id: 2, value: '+60'},
      //   {id: 3, value: '+372'},
      //   {id: 4, value: '+421'},
      //   {id: 5, value: '+65'},
      //   {id: 6, value: '+503'},
      //   {id: 7, value: '+1868'},
      //   {id: 8, value: '+49'},
      //   {id: 9, value: '+264'},
      //   {id: 10, value: '+56'},
      //   {id: 11, value: '+56'},
      // ],
      phoneNum: '', // 手机号
      phoneError: '', // 手机号error提示
      emailNum: '', // 邮箱
      emailNumError: '', // 邮箱的错误提示
      codeNum: '', // 验证码
      content: '获取验证码',
      sendTime: 60, // 验证码60s发送一次
      canSend: false, // 获取验证码按钮 false为可用
      codeError: '', // 验证码错误提示
      isChecked: false, //是否选择用户协议
      // isSubNot: true, // true: 按钮不可以点击 false：按钮可以点击(短信验证码注册成功即可以注册)
      isNextNot: false, // 同上
      identifyCode: '', // 图片验证码
      getIdentifyCode: '', // input种获取的图形验证码
      identifyCodes: '3456789ABCDEFGHGKMNPQRSTUVWXY', // 验证码规则
      identifyError: '', // 图形验证码提示
    } 
  },
  mounted: function () {
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 错误码重置
    errorReset: function () {
      this.phoneError = '';
      this.emailNumError = '';
      this.codeError = '';
      this.identifyError = '';
    },
    // 注册数据重置
    dataReset: function() {
      this.selectCountry = 1;
      this.phoneNum = '';
      this.emailNum = '';
      this.codeNum = '';
      this.content = '获取验证码';
      this.isChecked = false;
      this.getIdentifyCode = '';
    },
    // 注册方式
    loginStau: function() {
      this.errorReset();
      this.dataReset();
      this.makeCode(this.identifyCodes, 4)
      this.isPhoneLogin = !this.isPhoneLogin
    },
    // 切换验证码
    refreshCode: function() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成随机验证码
    makeCode: function(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[Math.floor(Math.random() * (this.identifyCodes.length - 0) + 0)]
      }
    },
    // 手机号 注册
    handleRegistered: function() {
      this.errorReset();
      if (this.codeNum === '') {
        this.codeError = '请输入短信验证码'
      }
      if (!this.isChecked) {
        this.$toast('请同意用户协议', 'error', 1500)
      }
      console.log('注册')
      const data = {
        num: this.phoneNum,
        type: 'phone'
      }
      this.$emit('singin-up', data)
    },
    // 邮箱 下一步
    handleRegisteredNext: function() {
      this.errorReset();
      if (this.codeNum === '') {
        this.codeError = '请输入短信验证码'
      }
      if (!this.isChecked) {
        this.$toast('请同意用户协议', 'error', 1500)
      }
      console.log('下一步')
      const data = {
        num: this.emailNum,
        type: 'email'
      }
      this.$emit('singin-up', data)
    },
    // 验证号码正确性(手机号注册)
    getPhoneCorrect: function(number, imgCode) { 
      this.correct = false // 重置
      if (number === '') {
        this.phoneError = '请输入手机号'
        // this.$toast('请输入手机号', 'error', 1500)
        this.correct = false
      } else if (imgCode === '') {
        this.identifyError = '请输入图形验证码'
        // this.$toast('请输入图形验证码', 'error', 1500)
        this.correct = false
      } else if (imgCode !== this.identifyCode) {
        this.$toast('图形验证码错误', 'error', 1500)
        this.refreshCode()
        this.correct = false
      } else {
        if (!/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/.test(number)) {
          this.$toast('手机号格式不正确', 'error', 1500)
          this.correct = false
        } else {
          this.correct = true
        }
      }
    },
    // 验证号码正确性(邮箱注册)
    getEmailCorrect: function (number, imgCode) {
      this.correct = false // 重置
      if (number === '') {
        this.emailNumError = '请输入邮箱号'
        // this.$toast('请输入手机号', 'error', 1500)
        this.correct = false
      } else if (imgCode === '') {
        this.identifyError = '请输入图形验证码'
        // this.$toast('请输入图形验证码', 'error', 1500)
        this.correct = false
      } else if (imgCode !== this.identifyCode) {
        this.$toast('图形验证码错误', 'error', 1500)
        this.refreshCode()
        this.correct = false
      } else {
        if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(number)) {
          this.$toast('邮箱格式不正确', 'error', 1500)
          this.correct = false
        } else {
          this.correct = true
        }
      }
    },
    // 发送验证码
    captchaSent: function () { 
      if (this.isPhoneLogin) {
        this.getPhoneCorrect(this.phoneNum, this.getIdentifyCode)
      } else {
        this.getEmailCorrect(this.emailNum, this.getIdentifyCode)
      }
      
      if (this.correct === true) {
        // eslint-disable-next-line no-undef
        // captchaSent(this.phoneNum, new Date()).then(res => {
        //   if (res.code === 200) {
        //     this.$toast('获取验证码成功', 'success', 3000)
        //     this.canSend = true
        //     this.content = this.sendTime + 's后重新发送'
        //     let timer = setInterval(async () => {
        //       this.sendTime--
        //       this.content = this.sendTime + 's后重新发送'
        //       if (this.sendTime < 0) {
        //         clearInterval(timer)
        //         this.content = '重新发送验证码'
        //         this.sendTime = 60
        //         this.canSend = false // 这里重新开启
        //          
        //       }
        //     }, 1000)
        //   } else {
        //     this.$toast('获取验证码失败', 'error', 3000)
        //   }
        // })
        this.$toast('获取验证码成功', 'success', 3000)
        this.canSend = true
        this.content = this.sendTime + 's后重新发送'
        var that = this; // 不能用let 无法提升
        let timer = setInterval(function () {
          that.sendTime--
          that.content = that.sendTime + 's后重新发送'
          if (that.sendTime < 0) {
            clearInterval(timer)
            that.content = '重新发送验证码'
            that.sendTime = 60
            that.canSend = false // 这里重新开启
          }
        }, 1000)
      }
    }
  }
 
}
</script>
<template>
  <div class="h-sigin">
    <!-- 手机号登录 -->
    <template v-if="isPhone">
     <!-- 登录 -->
      <template v-if="isPhoneLogin">
        <!-- 手机号 国家码 -->
        <div class="form-phone" :class="{'form-error': phoneError}">
          <div class="form-title">国家码</div>
          <div class="country">
            <select name="" id="" v-model="selectinPhone">
              <option v-for="(item, index) in phoneinData" :value="item.id" :key="index">{{item.value}}</option>
            </select>
            <input type="text" v-model="phoneinNum" maxlength="11" placeholder="请输入手机号">
          </div>
        </div>
        <div class="error-tip" v-if="phoneError">{{phoneError}}</div>
        <p style="color:#ccc; font-size: 12px; margin-top: 20px;">未注册手机号验证后将自动创建雷神账号</p>
        <div class="form-text">
          <input type="checkbox" v-model="isCheck">
          <div>已经阅读并同意雷神账号<span>用户协议</span>和<span>隐私政策</span></div>
        </div>
        <button class="form-submit" :disabled="!phoneinNum" :class="{'btn-disabled':!phoneinNum}" @click="phoneLoginNext">下一步</button>
        <div class="form-tip">
          <div>忘记账号？</div>
          <div @click="isPhone = !isPhone">密码登录</div>
        </div>
      </template>
      <!-- 验证码 -->
      <template v-else>
        <div class="form-tip" style="margin-top: 30px;">
          <div style="color: #000;">验证码已发送至{{phoneinNum}}</div>
          <div @click="edit">修改</div>
        </div>
        <div class="form-code" :class="{'form-error': codeError}">
          <div class="code">
            <input type="text" v-model="codeNum" placeholder="请输入验证码">
            <button :disabled="canSend" @click="captchaSend">{{content}}</button>
          </div>
        </div>
        <div class="error-tip" v-if="codeError">{{codeError}}</div>
      <button class="form-submit" :disabled="!codeNum" :class="{'btn-disabled':!codeNum}" @click="codeLogin">登录</button>
      <div class="form-tip">
        <div>收不到验证码？</div>
        <div @click="changeLogin">密码登录</div>
      </div>
      </template>
    </template>
    <!-- 账密登录 -->
    <template v-else>
      <div class="form-setphone" :class="{'form-error': accountError}">
        <input type="text" v-model="accountNum" placeholder="邮箱/手机号/雷神账号">
      </div>
      <div class="error-tip" v-if="accountError">{{accountError}}</div>
      <div class="form-setphone" :class="{'form-error': passwordError}">
        <input type="password" v-model="accountPass" placeholder="设置密码">
      </div>
      <div class="error-tip" v-if="passwordError">{{passwordError}}</div>
      <div class="form-text">
        <input type="checkbox" v-model="isCheck">
        <div>已经阅读并同意雷神账号<span>用户协议</span>和<span>隐私政策</span></div>
      </div>
      <button class="form-submit" :disabled="!accountNum || !accountPass" :class="{'btn-disabled':!accountNum || !accountPass}" @click="accountLogin">登录</button>
      <div class="form-tip">
        <div @click="goReset">忘记密码？</div>
        <div @click="changeLogin">手机号登录</div>
      </div>
    </template>
    
  </div>
</template>
<script> 
// 1、短信是否限制条数（小米手机号登录限制三条）
module.exports = {
  name: 'sigin-in', // 登录
  data: function () {
    return {
      isPhone: false, // true: 手机号登录 false： 账密登录
      accountNum: '', // 账号
      accountPass: '', // 密码
      isCheck: false, // 是否选择用户协议
      selectinPhone: 1, // 手机号登录时国家码id
      phoneinData: [ // 手机号登录 国家码列表
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
      phoneinNum: '', // 手机号登录 手机号
      codeNum: '', // 验证码
      content: '获取验证码',
      sendTime: 60, // 验证码60s发送一次
      canSend: false, // 获取验证码按钮 false为可用
      codeError: '', // 验证码错误提示
      isPhoneLogin: true, // true: 登录界面 false: 验证码界面
      phoneError: '', // 手机号错误提示
      // isNextNot: true, // true: 按钮不可以点击 false：按钮可以点击 (下一步)
      accountError: '' , // 账号错误提示
      passwordError: '', // 密码错误提示
    }
  },
  mounted: function () {
  },
  methods: {
    // 重置密码(忘记密码)
    goReset: function() {
      window.location.href = './reset.html'
    },
    // 修改手机号（跳至登录)
    edit: function () {
      console.log(22)
      this.dataReset();
      this.errorReset();
      this.isPhone = true;
      this.isPhoneLogin = true;
    },
    // 数据重置
    dataReset: function () {
      this.accountNum = '';
      this.accountPass = '';
      this.isCheck = false;
      this.selectinPhone = 1;
      this.phoneinNum = '';
    },
    // 错误提示重置
    errorReset: function () {
      this.phoneError = '';
      this.accountError = '';
      this.passwordError = '';
      this.codeError = '';
    },
    // 验证号码正确性
    getCorrect: function(number, imgCode) { 
      this.correct = false // 重置
      if (number === '') {
        this.$toast('请输入手机号', 'error', 1500)
        this.correct = false
      } else if (imgCode === '') {
        this.$toast('请输入图形验证码', 'error', 1500)
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
    // 账号密码登录
    accountLogin: function () {
      if (!this.isCheck) {
        this.$toast('请同意用户协议', 'error', 1500);
        return false;
      }
    },
    // 验证码登录
    codeLogin: function () {
      console.log('验证码登录')
    },
    // 切换登录方式
    changeLogin: function () {
      this.dataReset();
      this.errorReset();
      this.isPhone = !this.isPhone;
    },
    // 手机号登录下一步
    phoneLoginNext: function () {
      this.phoneError ='';
      if (!/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/.test(this.phoneinNum)) {
        this.phoneError = '手机号格式不正确'
      } else if (!this.isCheck) {
        this.$toast('请同意用户协议', 'error', 1500)
      } else {
        this.isPhoneLogin = !this.isPhoneLogin
      }
    },
    // 获取验证码
    captchaSend: function() {
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
</script>
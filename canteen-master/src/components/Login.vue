<template>
  <div id="" class="login">
    <x-header slot="header" class="m-header" :left-options="{showBack: false, backText: ''}"></x-header>
    <div v-if="flag">
      <button class="login-ipt" @click="selectLogin">登入</button>
      <button class="login-ipt" @click="selectRegister">注册</button>
    </div>
    <div v-else>
      <div>
        <input class="login-ipt" type="tel" v-model="phone" placeholder="请您输入您的手机号" >
      </div>
      <div>
        <input class="login-ipt" type="password" v-model="pwd" placeholder="请您输入您的密码">
      </div>
      <div @click="login" class="login-btn"><img src="../assets/images/login.png" alt=""></div>
    </div>
    <toast v-model="errorShow" :time="800" type="text" :position="toastPosition" is-show-mask >{{errorMsg}}</toast>
  </div>
</template>

<script>
  import { Toast, XHeader } from 'vux'

  export default {
    components: {
      Toast,
      XHeader
    },
    name: 'login',
    data () {
      return {
        phone: '',
        pwd: '',
        errorShow: false,
        errorMsg: '',
        toastPosition: 'middle',
        flag: true
      }
    },
    methods: {
      isFirst: function () {
        let pwd = localStorage.pwd
        let mobile = localStorage.mobile
        if (!pwd) {
          this.pwd = '666666'
        } else {
          this.pwd = pwd
        }
        this.phone = mobile || ''
      },
      login: function () {
        let _self = this
        let data = {
          mobile: this.phone,
          password: this.pwd
        }
        this.$.ajax({
          url: this.api + '/api.php/public/login',
          type: 'post',
          data: data,
          dataType: 'json',
          success: function (res) {
            if (res.success) {
              localStorage.pwd = _self.pwd
              localStorage.mobile = _self.phone
              _self.$router.push('/home')
            } else {
              _self.errorShow = true
              _self.errorMsg = res.message
            }
          }
        })
      },
      selectLogin: function () {
        this.flag = false
      },
      selectRegister: function () {
        this.$router.push('/info')
      }
    },
    created () {
      this.isFirst()
    }
  }
</script>

<style lang="less">
  .login {
    height: 100vh;
    background: url("../assets/images/bg.jpg") no-repeat center top;
    -webkit-background-size: cover;
    background-size: cover;
    padding-top: 4.9rem;
    .m-header {
      background: none transparent;
    }
    .login-ipt {
      border: 1px solid #fff;
      color: #fff;
      font-size: .24rem;
      width: 56%;
      height: .6rem;
      border-radius: 5px;
      background-color: transparent;
      text-align: center;
      margin: 0 auto .29rem;
      display: block;
    }
    .login-btn{
      padding-top: .53rem;
      img{
        display: block;
        margin: 0px auto;
        width: 1.27rem;
        height: 1.27rem;
      }
    }
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #fff;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #fff;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #fff;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #fff;
  }
</style>

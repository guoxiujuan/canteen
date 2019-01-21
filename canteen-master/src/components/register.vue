<template>
  <div id="" class="login">
    <x-header slot="header" class="m-header" :left-options="{showBack: false, backText: ''}"></x-header>

    <div class="login-txt">
      <img src="../assets/images/login-txt.png" alt="">
    </div>
    <div class="login-logo">
      <img src="../assets/images/login-logo.png" alt="">
    </div>
    <div>
      <input class="login-ipt" type="tel" v-model="phone" placeholder="请您输入您的手机号" >
    </div>
    <div>
      <input class="login-ipt" type="password" v-model="pwd" placeholder="请您输入您的密码" readonly>
    </div>
    <!--<button @click="regist" type="button">默认密码登录</button>-->
    <button @click="regist" type="button">登录</button>

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
        pwd: '1234567890',
        errorMsg: '',
        errorShow: false,
        toastPosition: 'middle'
      }
    },
    methods: {
      regist: function () {
        let _self = this
        let data = {
          mobile: this.phone,
          password: this.pwd
        }
        this.$.ajax({
          url: this.api + '/api.php/public/register',
          type: 'post',
          data: data,
          dataType: 'json',
          success: function (res) {
            if (res.success) {
              _self.$router.push('/info')
            } else {
              _self.errorShow = true
              _self.errorMsg = res.message
            }
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .login {
    height: 100vh;
    background: linear-gradient(#674af0, #7d52f9) no-repeat scroll 0 0 transparent;
    .m-header {
      background: none transparent;
    }
    .login-txt {
      padding-top: 1.54rem;
    }
    .login-logo {
      margin-top: .7rem;
      text-align: center;
      margin-bottom: .55rem;
      img {
        width: 2.91rem;
        height: 2.89rem;
      }
    }
    .login-ipt {
      border: 1px solid #fff;
      color: #fff;
      font-size: .24rem;
      width: 4.28rem;
      height: .6rem;
      border-radius: 5px;
      background-color: transparent;
      text-align: center;
      margin: 0 auto .23rem;
      display: block;
    }
    button {
      color: #674af0;
      width: 4.28rem;
      height: .6rem;
      border-radius: 5px;
      margin: .39rem auto;
      font-size: .32rem;
      display: block;
      border: 0 none;
      background: linear-gradient(#c3cfe2, #f5f7fa );
      &:active {
        background: linear-gradient(#f5f7fa , #c3cfe2);

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

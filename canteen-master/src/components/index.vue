<template>
  <div id="" class="index-page">
    <div class="login-txt">
      <img src="../assets/images/login-txt.png" alt="">
    </div>
    <div class="login-logo">
      <img src="../assets/images/login-logo.png" alt="">
    </div>
    <router-link to="/login" class="link-btn">登录</router-link>
    <router-link to="/register" class="link-btn">注册</router-link>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
  .index-page {
    height: 100vh;
    background: linear-gradient(#674af0, #7d52f9) no-repeat scroll 0 0 transparent;
    .login-txt {
      padding-top: 1.54rem;
    }
    .login-logo {
      margin-top: .7rem;
      text-align: center;
      margin-bottom: 1.35rem;
      img {
        width: 2.91rem;
        height: 2.89rem;
      }
    }
    .link-btn {
      border: 1px solid #fff;
      color: #fff;
      font-size: .28rem;
      width: 4.28rem;
      height: .6rem;
      border-radius: 5px;
      background-color: transparent;
      text-align: center;
      margin: 0 auto .23rem;
      display: block;
      line-height: .6rem;
      font-weight: normal;
    }

  }
</style>

<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">

@import '~vux/src/styles/reset.less';

* {
  padding: 0;
  margin: 0;
  line-height: normal;
  box-sizing: border-box;
  text-decoration: none;
  letter-spacing: inherit;
}
img {
  max-width: 100%;
  vertical-align: middle;
}
html, body {
  font-family: "Microsoft YaHei", '微软雅黑', Arial, SansSerif, sans-serif;
  background-color: #f6f6f6;
  height: 100%;
  overflow-x: hidden;
}
.m-header {
  height: .88rem;
  background: linear-gradient(to right, #2ae3fd, #24b7c4);
  font-size: .32rem;
  color: #fff;
  text-align: center;
  line-height: .88rem;
  position: absolute!important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  h1.vux-header-title {
    font-size: .32rem;
    margin-bottom: 1px;
  }
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #ff6a46!important;
}
.food-menu {
  .weui-tabbar__icon {
    width: .5rem;
    height: .5rem;
  }

}
.food-order {
  .weui-tabbar__icon {
    width: .5rem;
    height: .5rem;
  }
}
.food-user {
  .weui-tabbar__icon {
    width: .5rem;
    height: .5rem;
  }
}
.weui-tabbar__item {

}
.weui-tabbar {
  height: 1.03rem;
  padding-top: 0.12rem;
  background-color: #fff!important;
  .weui-tabbar__item {
    padding: .14rem 0 0;
  }
}
.g-clearfix {
  &:after {
    display: block;
    overflow: hidden;
    clear: both;
    content: '';
  }
}
.g-fl {
  float: left;
}
.g-fr {
  float: right;
}
.page-main {
  margin-top: .88rem;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  height: 100%;
}
.vux-header .vux-header-left .left-arrow:before{
  border: 1px solid #fff!important;
  border-width: 1px 0 0 1px!important;
}
</style>

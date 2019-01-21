<template>
  <div id="" class="info-page">
    <x-header  class="m-header" :left-options="{showBack: true, backText: ''}">注册</x-header>
    <div class="info-main">
      <group>
        <x-input type="text" title="姓名" v-model="info.name" placeholder="姓名"></x-input>
        <cell>
          <checker slot="after-title" v-model="info.sex" default-item-class="x-checker" selected-item-class="x-checker-checked">
            <checker-item value="0" >先生</checker-item>
            <checker-item value="1">女士</checker-item>
          </checker>
        </cell>
        <x-input type="tel" title="电话" placeholder="请您输入您的手机号" v-model="info.mobile"></x-input>
        <selector title="楼层" v-model="info.floor" :options="floorOpt" placeholder="请选择您所在楼层"></selector>
        <selector title="部门" v-model="info.section" :options="departmentOpt" placeholder="请选择您所属部门"></selector>
        <!--<x-input type="text" title="部门" placeholder="请填写您所属部门" v-model="info.section"></x-input>-->
        <x-input type="password" title="密码修改" v-model="info.password" placeholder="请您设置2～16位密码（不能是中文）"></x-input>
        <x-input type="password" title="确认密码" v-model="pwdRepeat" placeholder="请您再次确认密码"></x-input>
      </group>
      <div class="accept"><i :class="{'agreen':agreened}" @click="agreened = !agreened"></i>我已阅读并接受 <a href="javascript:void(0)" @click="agreenShow = !agreenShow">《服务协议条款》</a></div>
      <!--<x-button class="ok-btn" slot="title" action-type="button" type="primary" @click.native="updateInfo">确认</x-button>-->
      <img src="../assets/images/icon7.png" alt="" @click.native="updateInfo" class="save-btn">
    </div>
    <toast v-model="errorShow" :time="800" type="text" :position="toastPosition" is-show-mask >{{errorMsg}}</toast>
    <div class="agreen-content" v-if="agreenShow">
      <div class="content">
        <i @click="agreenShow = !agreenShow"></i>
        我已阅读并接受我已阅读并接受我已阅
        读并接受我已阅读并接受我已阅读并接受我已阅读并接受我已阅读并接受我已阅读并接
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Cell, Group, XInput, Checker, CheckerItem, Selector, XButton, Toast } from 'vux'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    XInput,
    Checker,
    CheckerItem,
    Selector,
    XButton,
    Toast
  },
  name: 'info',
  data () {
    return {
      title: '信息填写',
      floorOpt: ['F1', 'F2', 'F3'],
      departmentOpt: ['设计部', '技术部'],
      pwdRepeat: '',
      errorMsg: '',
      errorShow: false,
      toastPosition: 'middle',
      info: {
        name: '',
        sex: '',
        section: '',
        mobile: '',
        floor: '',
        password: ''
      },
      agreened: false,
      agreenShow: false
    }
  },
  methods: {
    getInfo: function () {
      let _self = this
      this.$.ajax({
        url: this.api + '/api.php/index/userinfo',
        type: 'get',
        dataType: 'json',
        success: function (res) {
          if (res.success) {
            _self.info = res.data
          } else {
            _self.errorShow = true
            _self.errorMsg = res.message
          }
        }
      })
    },
    updateInfo: function () {
      let _self = this
      _self.info.passwordConfirm = _self.pwdRepeat
      console.log(_self.info)
      this.$.ajax({
        url: this.api + '/api.php/index/userinfo',
        type: 'post',
        data: _self.info,
        dataType: 'json',
        success: function (res) {
          if (res.success) {
            _self.errorShow = true
            _self.errorMsg = '保存成功'
            localStorage.pwd = _self.pwdRepeat
            localStorage.mobile = _self.info.mobile
            _self.pwdRepeat = ''

            setTimeout(function () {
              _self.$router.push('/home')
            }, 1000)
          } else {
            _self.errorShow = true
            _self.errorMsg = res.message
          }
        }
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="less">
  .agreen-content{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
    z-index: 100;
    .content{
      width: 80%;
      padding: .5rem .2rem .2rem;
      background: #fff;
      font-size: .25rem;
      line-height: .3rem;
      color: #666;
      position: fixed;
      left: 10%;
      top: 20%;
      max-height: 60%;
      overflow: auto;
      border-radius: 4px;
      i{
        position: absolute;
        width: .22rem;
        height: .22rem;
        content: '';
        background: url(../assets/images/icon-close.png) no-repeat center center;
        -webkit-background-size: .22rem .22rem;
        background-size: .22rem .22rem;
        right: .2rem;
        top: .2rem;
      }
    }
  }
  .info-page {
    /*height: 100vh;*/
    padding-bottom: .24rem;
    background-color: #fff;
    .m-header {
      height: .88rem;
      background: linear-gradient(to right, #2ae3fd, #24b7c4);
      font-size: .32rem;
      color: #fff;
      text-align: center;
      line-height: .88rem;
    }
    .weui-cell_select .weui-cell__bd:after {
      transform: rotate(135deg);
      border-color: #714ef4;
    }
    .weui-cell__hd {
      width: 1.7rem;
      font-size: .32rem;
      color: #4c4d50;
    }
    .weui-cell__bd {
      * {
        font-size: .24rem;
      }
    }
    .weui-select {
      color: #9ba7bf!important;

      option {
        color: #9ba7bf!important;

      }

    }
    .x-checker {
      font-size: .24rem;
      border: 1px solid #9ba7bf;
      border-radius: 4px;
      color: #9ba7bf;
      padding: 2px 10px;
      &.x-checker-checked {
        color: #fff;
        background: linear-gradient(to right, #2ae3fd, #24b7c4);
      }
    }
    .ok-btn {
      width: 5.6rem;
      height: .58rem;
      display: block;
      margin: .54rem auto 0;
      color: #fff;
      border-radius: 50px;
      font-size: .32rem;
      line-height: .58rem;
      background: linear-gradient(to right, #7d52f9, #674af0);
    }
    .save-btn{
      display: block;
      width: 1.27rem;
      height: 1.27rem;
      margin: .6rem auto 0;
    }
    .accept{
      font-size: .25rem;
      padding: .4rem .2rem;
      a{
        color: #9ba7bf;
        font-size: .2rem;
      }
      i{
        display: inline-block;
        width: .43rem;
        height: .43rem;
        background: #fff;
        border: 1px solid #666;
        vertical-align: middle;
        border-radius: 2px;
        margin-right: 4px;
      }
      .agreen{
        background: url(../assets/images/icon1.png) no-repeat center top;
        border: none;
        -webkit-background-size: .43rem .43rem;
        background-size: .43rem .43rem;
      }
    }
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #9ba7bf;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #9ba7bf;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #9ba7bf;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #9ba7bf;
  }
  .info-main {
    margin-top: .88rem;
  }
</style>

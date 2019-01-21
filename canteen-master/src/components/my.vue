<template>
  <div id="" class="info-page">
    <x-header  class="m-header" :left-options="{showBack: false}">我的</x-header>
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
        <!--<selector title="楼层" v-model="info.floor" :options="floorOpt" placeholder="请选择您所在楼层"></selector>-->
        <selector title="部门" v-model="info.section" :options="departmentOpt" placeholder="请选择您所属部门"></selector>
        <!--<x-input type="text" title="部门" placeholder="请填写您所属部门" v-model="info.section"></x-input>-->
        <x-input type="password" title="密码修改" v-model="info.password" placeholder="请您设置2～16位密码（不能是中文）"></x-input>
        <x-input type="password" title="确认密码" v-model="pwdRepeat" placeholder="请您再次确认密码"></x-input>

      </group>
      <!--<x-button class="ok-btn" slot="title" action-type="button" type="primary" @click.native="updateInfo">保存</x-button>-->
      <img src="../assets/images/icon7.png" alt="" @click="updateInfo" class="save-btn">
    </div>
    <tabbar slot="bottom">
      <tabbar-item  link="/home" class="food-menu">
        <img src="../assets/images/foot-icon1.png" alt="" slot="icon">
        <span slot="label">菜单</span>
      </tabbar-item>
      <tabbar-item selected link="/orders" class="food-order">
        <img src="../assets/images/foot-icon3.png" alt="" slot="icon">
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item selected class="food-user" link="my">
        <img src="../assets/images/foot-icon6.png" alt="" slot="icon">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <toast v-model="errorShow" :time="800" type="text" :position="toastPosition" is-show-mask >{{errorMsg}}</toast>



  </div>
</template>

<script>
import { XHeader, Cell, Group, XInput, Checker, CheckerItem, Selector, XButton, Toast, Tabbar, TabbarItem } from 'vux'
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
    Toast,
    Tabbar,
    TabbarItem
  },
  name: 'my',
  data () {
    return {
      title: '信息填写',
      floorOpt: [1, 2, 3, 4],
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
        floor: ''
      }
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
            _self.getInfo()
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
      border-color: #24b7c4;
      width: 10px;
      height: 10px;
      margin-top: -7px;
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
    .weui-label {
      font-size: .24rem;
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

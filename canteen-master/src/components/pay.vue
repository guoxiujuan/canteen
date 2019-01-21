<template>
  <div id="" class="pay-page" style="height: 100%">

    <x-header slot="header" class="m-header" :left-options="{showBack: true, backText: ''}" >{{title}}</x-header>
    <div class="page-main">
      <group>
        <cell :title="'姓名'" :value="myInfo.name"></cell>
        <cell :title="'电话'" :value="myInfo.mobile"></cell>
        <cell :title="'部门'" :value="myInfo.section"></cell>
        <cell :title="'楼层'" :value="myInfo.floor"></cell>
      </group>
      <div class="pay-notice"><img src="../assets/images/icon6.png" alt=""></div>
      <div>
        <divider>已选菜单</divider>
        <group class="menu-list">
          <cell v-for="(item, index) in menu" :key="index" :title="item.name" >
            <span slot="default">
              {{'X' + item.num}}
            </span>
              <span slot="default">
              {{'¥' + item.price}}
            </span>
          </cell>
          <cell class="total-price">合计<em>¥{{total}}</em></cell>
          <x-input type="text" title="备注：" v-model="remark" >
            <span slot="right">口味、偏好等要求></span>
          </x-input>
        </group>
      </div>

    </div>

    <div class="pay-footer g-clearfix">
      <img src="../assets/images/icon7.png" alt="" @click="toPay">
    </div>
    <toast v-model="errorShow" :time="800" type="text" :position="toastPosition" is-show-mask >{{errorMsg}}</toast>
    <div v-transfer-dom>
      <alert v-model="alertShow" :title="alertTitle" :content="alertContent" @on-hide="closeAlert"></alert>
    </div>
  </div>
</template>

<script>
import {XHeader, Tabbar, TabbarItem, Group, Cell, Toast, Divider, XInput, Alert} from 'vux'
export default {
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    Toast,
    Divider,
    XInput,
    Alert
  },
  name: 'home',
  data () {
    return {
      title: '订单明细',
      remark: '',
      total: 0,
      myInfo: {
        name: '',
        section: '',
        mobile: '',
        floor: ''
      },
      menu: [],
      errorMsg: '',
      errorShow: false,
      toastPosition: 'middle',
      alertShow: false,
      orderNo: '',
      alertTitle: '',
      alertContent: '',
      isPayed: false
    }
  },
  methods: {
    closeAlert: function () {
      this.$router.push('orders')
    },
    toPay: function () {
      let _self = this
      let cart = []
      _self.menu.forEach(function (item, index) {
        cart.push({goodsID: item.goodsID, num: item.num})
      })
      this.$.ajax({
        url: this.api + '/api.php/index/submit',
        type: 'post',
        data: {
          'cart': JSON.stringify(_self.menu),
          'extra': _self.remark
        },
        dataType: 'json',
        success: function (res) {
          if (res.success) {
            _self.orderNo = res.data.orderNo
            _self.alertShow = true
            _self.alertTitle = '您的订单已生成'
            _self.alertContent = '订单编号：' + res.data.orderNo
            _self.isPayed = false
            localStorage.removeItem('good')
            setTimeout(function () {
              _self.$router.push('/orders')
            }, 1300)
          } else {
            _self.alertShow = true
            _self.isPayed = true
            _self.alertContent = res.message

//            _self.errorShow = true
//            _self.errorMsg = res.message
          }
        }
      })
    },
    getAccount: function () {
      let _self = this
      this.$.ajax({
        url: this.api + '/api.php/index/userinfo',
        dataType: 'json',
        success: function (res) {
          if (res.success) {
            _self.myInfo = res.data
          } else {
            _self.errorShow = true
            _self.errorMsg = res.message
          }
        }
      })
    },
    getOrder: function () {
      let order = JSON.parse(localStorage.good)
      this.menu = order
      let price = 0
      for (let i = 0; i < order.length; i++) {
        price += order[i].price * order[i].num
      }
      this.total = price
    }
  },
  created () {
    this.getAccount()
    this.getOrder()
  }
}
</script>

<style lang="less">
  .weui-mask{
    background: rgba(0,0,0,.3)!important;
  }
  .pay-page {
    .vux-label {
      font-size: .24rem;
    }
    .weui-cell {
      padding: 10px 0;
    }
    .weui-dialog {
      background: linear-gradient(to right,#24b7c4,#2ae3fd);
      color: #fff;
      overflow: visible;
      border:.06rem solid #89c3c9;
      border-radius: 6px;
      .weui-dialog__hd {
        padding-left: 0;
        padding-right: 0;
        text-align: center;
        font-size: .34rem;
        .weui-dialog__title {
          font-weight: normal;
        }
      }
      .weui-dialog__bd {
        color: #fff;
        text-align: center;
        font-size: .34rem;
        div {
          font-weight: normal;
        }
      }
      .weui-dialog__ft {
        position: absolute;
        bottom: 100%;
        right: 0;
        top: -.3rem;
        a {
          text-indent: -9999px;
          background: url("../assets/images/icon-close.png") no-repeat scroll 0 0 transparent;
          width: .21rem;
          height: .21rem;
          background-size: contain;
        }
      }
    }
    .pay-footer {
      height: 2.07rem;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-bottom: .8rem;
      img {
        display: block;
        width: 1.27rem;
        height: 1.27rem;
        margin: 0px auto;
      }
    }
    .icon {
      &.icon-edit {
        background: url("../assets/images/edit-icon.png") no-repeat scroll 0 0 transparent;
        background-size: contain;
        width: .31rem;
        height: .31rem;
        display: inline-block;
      }
    }
    .vux-divider {
      color: #4c4d50;
      font-size: .35rem;
      text-align: left;
      display: block;
      padding-left: .2rem;
      position: relative;
      margin-top: .3rem;
      border-bottom: 1px solid #d5d5d5;
      &:after{
        display: none;
      }
      &:before{
        background: #ff6a46;
        width: .06rem;
        height: .33rem;
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -.165rem;
      }
    }
    .page-main {
      padding-bottom: 2.07rem;
      background-color: #fff;
      .total-price {
        color: #4c4d50;
        font-size: .36rem;
        padding: 15px 0!important;
        &:before {
          /*border-top: 1px solid #D9D9D9!important;*/
        }
        .weui-cell__ft {
          color: #4c4d50;
        }
        em{
          font-style: normal;
          color: #ff6a46;
        }
      }
      > div {
        padding:  0 .4rem;
      }
      .pay-notice {
        border-top: .08rem solid #f6f6f6;
        padding-top: .14rem;
        padding-bottom: .14rem;
        line-height: normal;
        font-size: 12px;
        border-bottom: 1px solid #d6d6d6;
        img {
          vertical-align: middle;
          width: 3.2rem;
          margin: 0px auto .2rem;
          display: block;
        }
      }
      .menu-list {
        .weui-cells {
          margin-top: 0;
          &:before {
            border: 0 none;
          }
          &:after{
            border: none;
          }
        }
        .weui-cell {
          padding: 5px 0;
          &.vux-x-input {
            margin-top: 10px;
            font-size: .3rem;
            color: #505050;
            &:before {
              /*border-top: 1px solid #D9D9D9 ;*/
            }

            .weui-label {
              font-size: .24rem;
              color: #333333;
            }
          }
          &:before {
            border: 0 none;
          }
          .vux-label {
            font-size: .24rem;
            color: #4c4d50;
          }
          .weui-cell__ft {
            span {
              font-size: .24rem;
              color: #8c8c8c;
            }
          }
        }
      }
    }

  }
</style>

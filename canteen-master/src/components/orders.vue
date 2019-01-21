<template>
  <div id="" class="orders-page">
    <x-header slot="header" class="m-header" :left-options="{showBack: false}">{{title}}</x-header>
    <div class="page-main" >
      <div>
        <div v-for="(item, index) in orders" class="order">
          <div class="g-clearfix">
            <h2 class="g-fl">{{item.time}}</h2>
            <span class="g-fr">{{orderStatus[item.status]}}</span>
          </div>
          <p class="order-no">{{'订单号：' + item.orderNo}}
            <!--<span class="detail"><img src="../assets/images/icon9.png" alt=""></span>-->
          </p>
          <p class="goods-name">{{item.goodsName + ' 等' + item.totalNum + '件商品'}}<span class="price">{{'¥' + item.money}}</span></p>

          <x-button class="cancel-btn" v-if="item.status==0" mini type="warn" action-type="button" text="取消订单" @click.native="cancelOrder(item.id)"></x-button>
          <!--<ul class="detail-list">-->
            <!--<li>-->
              <!--<h3>酸菜鱼</h3>-->
              <!--<p class="num">x1</p>-->
              <!--<span class="money">￥8.0</span>-->
            <!--</li>-->
          <!--</ul>-->
        </div>
      </div>

    </div>

    <tabbar slot="bottom">
      <tabbar-item selected link="/home" class="food-menu">
        <img src="../assets/images/foot-icon1.png" alt="" slot="icon">
        <span slot="label">菜单</span>
      </tabbar-item>
      <tabbar-item selected link="/orders" class="food-order">
        <img src="../assets/images/foot-icon4.png" alt="" slot="icon">
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item class="food-user" link="my">
        <img src="../assets/images/foot-icon5.png" alt="" slot="icon">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <!--</view-box>-->
    <toast v-model="errorShow" :time="800" type="text" :position="toastPosition" is-show-mask >{{errorMsg}}</toast>
    <confirm v-model="showConfirm" :title="confirmTitle" :close-on-confirm="false" @on-confirm="confirmCancel(toConfirmId)">
      <p>是否确定？</p>
    </confirm>
  </div>
</template>

<script>
import {XHeader, Tabbar, TabbarItem, Group, Cell, Toast, Divider, XInput, XButton, Confirm} from 'vux'

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
    XButton,
    Confirm
  },
  name: 'orders',
  data () {
    return {
      title: '全部订单',
      errorMsg: '',
      errorShow: false,
      toastPosition: 'middle',
      orders: [],
      showConfirm: false,
      confirmTitle: '删除订单？',
      toConfirmId: '',
      orderStatus: {
        0: '待接单',
        1: '待取餐',
        2: '完成'
      }
    }
  },
  methods: {
    cancelOrder: function (id) {
      this.toConfirmId = id
      this.showConfirm = true
    },
    confirmCancel: function (id) {
      console.log(id)

      let _self = this
      this.$.ajax({
        url: _self.api + '/api.php/index/cancel',
        dataType: 'json',
        data: {id},
        success: function (res) {
          console.log(res)
          if (res.success) {
            _self.getOrders()
            _self.showConfirm = false
          }
        }
      })
    },
    getOrders: function () {
      let _self = this
      this.$.ajax({
        url: _self.api + '/api.php/index/orders',
        dataType: 'json',
        success: function (res) {
          if (res.success) {
            _self.orders = res.data
          } else {
            _self.errorShow = true
            _self.errorMsg = res.message
          }
        }
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style lang="less">
.orders-page {

  .weui-dialog {
    .weui-dialog__hd {
      line-height: 0;
      padding: .5rem .2rem .2rem;
    }
    .weui-dialog__ft {
      height: 48px;
      .weui-dialog__btn {
        line-height: inherit;
      }
    }
  }
  .order {
    background-color: #fff;
    padding: .2rem .4rem .9rem;
    margin-bottom: 2px;
    position: relative;
    .cancel-btn {
      position: absolute;
      right: .4rem;
      bottom: .2rem;
    }
    h2 {
      color: #4c4d50;
      font-size: .32rem;
    }
    span {
      font-size: .22rem;
      color: #4c4d50;

    }
    .detail-list{
      font-size: .2rem;
      li{
        list-style: none;
        position: relative;
        color: #8c8c8c;
        h3{
          color: #333;
          font-size: .3rem;
        }
        .money{
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .order-no {
      color: #4c4d50;
      font-size: .22rem;
      margin: 5px 0;
      position: relative;
      .detail{
        img{
          width: .52rem;
          height: .52rem;
          position: absolute;
          right: 0;
          top: -.15rem;
        }
      }
    }
    .goods-name {
      font-size: .24rem;
      color: #9ba7bf;
      position: relative;
      .price {
        font-size: .24rem;
        color: #4c4d50;
        position: absolute;
        right: 0;
        top: 0;
        color: #ff6a46;
      }
    }
  }
}
</style>

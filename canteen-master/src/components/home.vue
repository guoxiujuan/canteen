<template>
  <div id="" class="home-page" style="height: 100%">
    <!--<view-box ref="viewBox">-->

      <x-header slot="header" class="m-header" :left-options="{showBack: false}">{{title}}</x-header>
      <div class="subTit">{{subTit}}</div>
      <div class="g-clearfix goods-view" >
        <div class="g-fl menuType">
          <ul>
            <li v-for="(item , index) in goodsList" :key="index">
              <a href="javascript:;" v-bind:class="index===typeIndex ? 'active' : ''" @click="changeType(index)">{{item.category}}</a>
            </li>
          </ul>
        </div>
        <div class="g-fl goodsList">
          <group>
            <cell v-for="(goods, index) in selectedGoodsList" :key="index" >
              <img :src="'/web' + goods.img" slot="icon" alt="" class="pic">
              <div slot="title">
                <p class="name">{{goods.name}}</p>
                <span class="price">{{'¥' + goods.price}}</span>
              </div>
              <inline-x-number v-bind:class="goodsNums[goods.id]===0 ? 'hideNum':''" button-style="round" :min="0" v-model="goodsNums[goods.id]" @on-change="selectGoods({goodsID: goods.id, num:goodsNums[goods.id], price: goods.price, name: goods.name})"></inline-x-number>
              <!--<div class="handle">-->
                <!--<img src="../assets/images/icon3.png" alt="" class="icon">-->
                <!--<input type="text" value="1">-->
                <!--<img src="../assets/images/icon4.png" alt=""  class="icon">-->
              <!--</div>-->
            </cell>
          </group>
        </div>
      </div>
      <div class="total-count g-clearfix">
        <i class="icon icon-cart"><em>{{len}}</em></i>
        <span>{{'¥' + total}}</span>
        <button class="g-fr" type="button" @click="toPay">去结算</button>
      </div>
      <tabbar slot="bottom">
        <tabbar-item selected link="home" class="food-menu">
          <img src="../assets/images/foot-icon2.png" alt="" slot="icon">
          <span slot="label">菜单</span>
        </tabbar-item>
        <tabbar-item class="food-order" link="/orders">
          <img src="../assets/images/foot-icon3.png" alt="" slot="icon">
          <span slot="label">订单</span>
        </tabbar-item>
        <tabbar-item class="food-user" link="/my">
          <img src="../assets/images/foot-icon5.png" alt="" slot="icon">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    <!--</view-box>-->
    <toast v-model="errorShow" :time="800" type="text" :position="toastPosition" is-show-mask >{{errorMsg}}</toast>

  </div>
</template>

<script>
import {XHeader, Tabbar, TabbarItem, InlineXNumber, Group, Cell, ViewBox, Toast} from 'vux'
export default {
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    InlineXNumber,
    Group,
    Cell,
    ViewBox,
    Toast
  },
  name: 'home',
  data () {
    return {
      typeIndex: 0,
      title: '本周菜单',
      subTit: '类型',
      total: 0,
      cart: [],
      errorMsg: '',
      errorShow: false,
      toastPosition: 'middle',
      goodsNums: {},
      selectedGoodsList: [],
      goodsList: [],
      len: 0,
      len2: 0
    }
  },
  methods: {
    toPay: function () {
      let str = JSON.stringify(this.cart)
      localStorage.good = str
      console.log(str)
      this.$router.push('/pay')
    },
    getGoods: function () {
      let _self = this
      this.$.ajax({
        url: _self.api + '/api.php/index/goods',
        dataType: 'json',
        success: function (res) {
          if (res.success) {
            console.log('success')
            _self.goodsList = res.data
            // _self.goodsList = []

            for (let i = 0; i < res.data.length; i++) {
              let goods = res.data[i].goods
              for (let j = 0; j < goods.length; j++) {
                // _self.goodsNums[goods[j].id] = 0
                _self.$set(_self.goodsNums, goods[j].id, 0)
              }
            }
            _self.selectedGoodsList = _self.goodsList[0].goods
          } else {
            _self.errorShow = true
            _self.errorMsg = res.message
          }
        }
//        complete: function (res) {
//          res.data = [
//            {category: '123', goods: []},
//            {
//              category: '水电费123',
//              goods: [
//                {id: '2', img: '/Uploads/2017/07/31/597eedeabdeac.jpg', name: '123', price: '33.00', stock: '12'}
//              ]
//            },
//            {
//              category: '阿斯蒂芬',
//              goods: []
//            }
//          ]
//          res.success = true
//          if (res.success) {
//            _self.goodsList = res.data
//            for (let i = 0; i < res.data.length; i++) {
//              let goods = res.data[i].goods
//              for (let j = 0; j < goods.length; j++) {
//                console.log(goods[j].id)
//                _self.goodsNums[goods[j].id] = 0
//              }
//            }
//          } else {
//            _self.errorShow = true
//            _self.errorMsg = res.message
//          }
//        }
      })
    },
    changeType: function (index) {
      this.typeIndex = index
      this.selectedGoodsList = this.goodsList[index].goods
    },
    selectGoods: function (goods) {
      let _self = this
      let isExit = false
      for (let i = 0; i < _self.cart.length; i++) {
        if (parseInt(_self.cart[i].goodsID) === parseInt(goods.goodsID)) {
          _self.cart[i].num = goods.num
          console.log(_self.cart[i].num)
          isExit = true
        }
      }
      if (!isExit) {
        this.cart.push(goods)
      }
      let count = 0
      // this.len = 0
      this.cart.forEach((item, index) => {
        count += item.price * item.num
        _self.len += item.num
      })
      this.total = count
    }
  },
  created () {
    this.getGoods()
  }
}
</script>

<style lang="less">
.home-page {
  .subTit {
    height: .5rem;
    background-color: #f4f4f4;
    color: #505050;
    font-size: .25rem;
    border-bottom: 1px solid #e5e5e5;
    padding-left: .25rem;
    line-height: .44rem;
    position: absolute;
    top: .88rem;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .hideNum {
    .vux-number-input {
      visibility: hidden;
    }
  }
  .vux-number-input {
    font-size: .24rem;
    position: relative;
    top: 4px;
  }
  .menuType {
    width: 1rem;
    border-right: 1px solid #e5e5e5;
    ul {
      li {
        border-bottom: 1px solid #d6d6d6;
        width: 100%;
        display: table;
        a {
          color: #505050;
          font-size: .24rem;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          /*line-height: 1.47rem;*/
          height: 1.9rem;
          &.active {
            color: #084e66;
            border-bottom: 5px solid #ff6a46;
          }
        }
      }
    }
  }
  .total-count {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    background-color: #343436;
    height: .76rem;
    border-top: 1px solid #e5e5e5;
    .icon-cart {
      background: url("../assets/images/icon5.png");
      display: inline-block;
      width: .84rem;
      height: .86rem;
      background-size: contain;
      position: absolute;
      top: 0;
      left: .22rem;
      margin-top: -.3rem;
      em{
        font-size: .1rem;
        width: .28rem;
        height: .28rem;
        line-height: .28rem;
        background: #ff6a46;
        border-radius: .28rem;
        position: absolute;
        top: .05rem;
        left: .7rem;
        color: #fff;
        font-style: normal;
        text-align: center;
      }
    }
    button {
      color: #fff;
      background: linear-gradient(to right, #24b7c4 ,#2ae3fd);
      width: 1.94rem;
      height: 100%;
      font-size: .34rem;
      border: 0 none;
    }
    span {
      font-size: .3rem;
      color: #fff;
      float: left;
      margin-left: 1.5rem;
      line-height: .72rem;
    }
  }
  .goods-view {
    position: absolute;
    top: 1.32rem;
    bottom: 1.72rem;
    overflow: hidden;
    background: #f4f4f4;
    > div {
      height: 100%;
      overflow-y: auto;
    }
  }
  .goodsList {
    width: 5.4rem;
    .pic {
      width: 1.3rem;
      height: 1.3rem;
    }

    .weui-cell {
      padding: .3rem .25rem;
      border-bottom: 1px solid #d6d6d6;
      position: relative;
      &:before{
        display: none;
      }
    }
    .weui-cells {
      margin: 0;
      &:before{
        display: none;
      }
      &:after{
        display: none;
      }
      .weui-cell__hd {
        margin-right: .25rem;
        width: 1.3rem;
        height: 1.3rem;
        background: #ccc;
      }
      .vux-cell-bd {
        position: relative;
        .vux-label {
          font-size: .24rem;
          color: #4c4d50;
          height: 1.3rem;
          span {
            color: #9ba7bf;
            font-size: .22rem;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
          }
          .name{
            max-height: .96rem;
            overflow: hidden;
          }
        }
      }
      .weui-cell__ft{
        height: 1.3rem;
        position: relative;
      }
    }
    .vux-inline-x-number{
      position: relative;
      top: .85rem;
    }
    .vux-number-selector-sub {
      border-color: #c1c1c1;
      box-sizing: content-box;

      svg {
        fill: #c1c1c1;
      }
    }
    .vux-number-selector-plus {
      box-sizing: content-box;
      color: #fff;
      background-color: #f4f4f4;
      border-color: #ffa044;
      svg {
        fill: #505050;
      }
    }
    .vux-number-disabled {
      visibility: hidden;
    }
  }
}
</style>

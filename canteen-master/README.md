# canteen

> 食堂

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# API

备注：
--------------------------------------------------------------

所有返回都是统一格式：

成功示例：
{
  "success": true,    返回状态
  "data": {},         返回数据，当 success 为 true  时，才有可能有值
  "message": ""       错误信息，当 success 为 false 时，才有可能有值
}
失败示例：
{
  "success": false,
  "data": [],
  "message": "该手机号已被注册"
}

--------------------------------------------------------------

1. 登录 POST
    url:/api.php/public/login
    param : mobile，password
    return:
          {
            "success": true,
            "data": {
              "customer_id": "1"    用户ID
            },
            "message": ""
          }

2. 注册 POST
      url:/api.php/public/register
      param:mobile，password
      return:
            {
              "success": true,
              "data": {
                "customer_id": "2"
              },
              "message": ""
            }

3. 获取我的信息 GET
      url:/api.php/index/userinfo
      {
        "success": true,
        "data": {
          "name": "张三",
          "sex": "男",
          "section": "技术部",
          "mobile": "18612345679"
        },
        "message": ""
      }

4. 编辑我的信息 POST
      url:/api.php/index/userinfo
      param:
          userInfo:{
              "name":"张三",
              "sex":"0/1",(0：男 1：女)
              "mobile":'13058822345',
              "floor": '1F'
              "section":"技术部",
              "password":"123",
              "passwordConfirm":"123"
          }
      result:
          {
            "success": true,
            "data": {},
            "message": ""
          }

4. 获取商品 GET
      url:/api.php/index/goods
      param:
      return:
            {
              "success": true,
              "data": [
                {
                  "category": "素菜",
                  "goods": [
                    {
                      "id": "1",
                      "name": "豆腐",
                      "img": "/Uploads/2017/07/31/aaaaa.jpg",
                      "stock": "10",
                      "price": "13.00"
                    }
                  ]
                },
                {
                  "category": "荤菜",
                  "goods": [
                    {
                      "id": "2",
                      "name": "鱼香肉丝",
                      "img": "/Uploads/2017/07/31/597eedeabdeac.jpg",
                      "stock": "10",
                      "price": "33.00"
                    }
                  ]
                },
              ],
              "message": ""
            }

5. 提交订单 POST
      url:/api.php/index/submit
      param:
            cart:[
                  {
                    "goodsID":"1",
                    "num":1
                  },
                  {
                    "goodsID":"3",
                    "num":1
                  }
            ]
            extra: '不要放辣椒！！！'

      return:
            {
              "success": true,
              "data": {
                "orderNo": "201708040001"
              },
              "message": ""
            }

6. 订单历史 GET
      url:./web/api.php/index/orders

      return:
            {
              "success": true,
              "data": [
                {
                  "id": "4",
                  "status": "配送中",
                  "orderNo": "201708040001",
                  "money": "20.00",
                  "time": "2017",
                  "totalNum": 2,
                  "goodsName": "酸菜鱼" （取1个菜名）
                },
                {
                  "id": "5",
                  "status": "配送中",
                  "orderNo": "201708040002",
                  "money": "10.00",
                  "time": "2017",
                  "totalNum": 1,
                  "goodsName": "千页豆腐" （取1个菜名）
                }
              ],
              "message": ""
            }

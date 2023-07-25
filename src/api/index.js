// API进行统一管理
import requests from './requests'
import mockRequests from './mockAjax'


// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发请求：axios发送请求返回结果Promise对象
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})
// 获取banner接口
export const reqBannerList = () => mockRequests({
    url: '/banner',
    method: 'get'
})
// 获取floor接口
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块的数据  要给服务器传递一个默认参数（至少是个空对象）
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

// 获取商品详情信息的接口 url：/api/item/{ skuId } 请求方式：get
export const reqGoodsInfo = (skuid) => requests({
    url: `item/${skuid}`,
    method: 'get',
})

// 将商品添加到购物车 获取更新购物车中某一个商品的个数
export const reqAddorUpdateShopcart = (skuid, skuNum) => requests({
    url: `cart/addToCart/${skuid}/${skuNum}`,
    method: 'post'
})

// 获取购物车列表 的接口
export const reqCartList = () => requests({
    url: `/cart/cartList`,
    method: 'get'
})

// 删除购物车产品
export const reqDeleteCartById = (skuid) => requests({
    url: `/cart/deleteCart/${skuid}`,
    method: 'delete'
})

// 修改购物车选中按钮
export const reqUpdataCheckedById = (skuid, isChecked) => requests({
    url: `/cart/checkCart/${skuid}/${isChecked}`,
    method: 'get'
})

// 获取验证码
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 用户注册
export const reqUserRegister = (data) => requests({
    url: `/user/passport/register`,
    method: 'post',
    data
})
// 用户登录
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    method: 'post',
    data
})

// 获取用户信息
export const reqUserInfo = () => requests({
    url: 'user/passport/auth/getUserInfo',
    method: 'get'
})
// 退出登录
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})
// 获取商品清单接口
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
})
// 获取支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})
// 查询支付订单状态
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})

import { reqAddorUpdateShopcart, reqGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodsInfo: {},
    uuid_token: getUUID()
}
const mutations = {
    GETGOODSINFO(state, data) {
        state.goodsInfo = data
    },

}
const actions = {
    // 获取产品信息
    async getGoodsInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid)
        if (result.code === 200) {
            commit("GETGOODSINFO", result.data)
        }
    },
    // 将产品加入购物车 async返回promise对象
    async addShopcart({ commit }, { skuid, skuNum }) {
        // 加入购物车 返回的解构
        // 加入购物车（发请求）之后，前台将参数带给服务器，
        // 服务器写入数据成功，并没有返回其他数据，只是返回code=200,代表此次操作成功
        // 因此不再需要commit ---修改state数据  虽然没用到commit,但是参数里一定要写
        let result = await reqAddorUpdateShopcart(skuid, skuNum)
        console.log(result);
        if (result.code == 200) { return 'ok' }
        else { return Promise.reject(new Error('failure')) }
    },
}
const getters = {
    // 分类视图
    categoryView(state) {
        // state.goodsInfo初始为空对象，在store中的数据还没更新之前，categoryView属性值为undefined 后面不能使用.category1Name
        return state.goodsInfo.categoryView || {}
    },
    // 商品属性 图片信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 商品售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    state, mutations, actions, getters
}
import { reqGetSearchInfo } from "@/api"
// 存储数据
const state = {
    searchList: {}
}
// 修改数据
const mutations = {
    GETSEARCHLIST(state, data) {
        state.searchList = data
    }
}
// 处理action 可以书写自己的业务逻辑，也可以处理异步 不能修改state
const actions = {
    async getSearchList({ commit }, params = {}) {
        // reqGetSearchInfo 至少传递一个参数
        // params形参 是当用户派发action时 第二个参数,至少是个空对象
        let result = await reqGetSearchInfo(params)
        console.log(result);
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// 可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    goodsList(state) {
        // console.log('search中的state', state);
        // 如果暂时没得到searchList 那么state.searchList.goodsList为undefined
        // 计算属性至少要传一个数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"
// home模块小仓库
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    CATEGORLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, data) {
        state.bannerList = data
        // console.log("修改仓库中的bannerlist数据");
    },
    GETFLOORLIST(state, data) {
        state.floorList = data
    },
}
const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    // {commit}就是把上下文对象中commit属性取出，赋值给同名变量commit，下面直接调用
    async CategoryList({ commit }) {
        let result = await reqCategoryList()
        // console.log(result);
        if (result.code === 200) {
            commit('CATEGORLIST', result.data)
        }
    },

    async getBannerList({ commit }) {
        // console.log('向服务器发送ajax请求，获取banner数据');
        let result = await reqBannerList()
        // console.log('mock banner数据', result);
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
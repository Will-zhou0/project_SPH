import { reqCartList, reqDeleteCartById, reqUpdataCheckedById } from "@/api";

const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, data) {
        state.cartList = data
    },
    DELETECARTLISTBYID(state, data) {

    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        console.log('shopcart', result);
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某一产品
    async deleteCartListById({ commit }, skuId, isChecked) {
        let result = await reqDeleteCartById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure111'))
        }
    },
    // 修改产品的checked属性
    async updateChecked({ commit }, { skuid, isChecked }) {
        const result = await reqUpdataCheckedById(skuid, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 删除所有选中
    deleteAllCheckedCart({ dispatch, getters }) {
        // context:小仓库 里面有{commit,dispatch,getters,state}
        // console.log(context);
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListById', item.skuId) : '';
            //    将每次返回的promise添加到数组中
            PromiseAll.push(promise);
        });
        // 只有全部的p1|p2...都成功，返回结果即为成功；
        // 一个失败，返回的即为失败结果
        return Promise.all(PromiseAll)
    },
    // 更新选中
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        console.log(isChecked);
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            // item.isChecked = isChecked
            let promise = dispatch('updateChecked', { skuid: item.skuId, isChecked })
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }

};
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    }
};
export default {
    state, mutations, actions, getters
}
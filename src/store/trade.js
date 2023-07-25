import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
    addressInfo: [],
    orderInfo: {}
};
const mutations = {
    GETADDRESSINFO(state, data) {
        state.addressInfo = data
    },
    GETORDERINFO(state, data) {
        state.orderInfo = data
    }
};
const actions = {
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo();
        console.log('addressInfo', result);
        if (result.code == 200) {
            commit('GETADDRESSINFO', result.data)
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }
};
const getters = {};
export default {
    state, mutations, actions, getters
}
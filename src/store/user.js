import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";

// 登陆与注册模块
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = '',
            state.userInfo = {},
            localStorage.removeItem('TOKEN')
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        console.log(result);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 用户登录
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        console.log(result);
        // result.data中带有token，服务器下发的用户唯一标识符uuid
        // 将来经常通过带token去找服务器要用户数据
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        console.log('userInfo', result);
        if (result.code == 200) {
            commit('GETUSERINFO', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
        }
    }
};
const getters = {

};
export default {
    state, mutations, actions, getters
}
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// login
export default new Vuex.Store({
    state: {
        user: false
    },
    mutations: {
        // login
        login(state, user) {
            state.user = user;
            localStorage.setItem("userInfo", user);
        },
        // logout
        logout(state, user) {
            state.user = "";
            localStorage.setItem("userInfo", "");
        }
    }
})

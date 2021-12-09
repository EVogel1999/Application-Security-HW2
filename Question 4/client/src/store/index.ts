import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = process.env.VUE_APP_API_URL;

export default new Vuex.Store({
  state: {
    user: undefined as any,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }, payload: { username: string, password: string, safe: boolean },) {
      try {
        const res = await axios.post(`${API_URL}/login?safe=${payload.safe}`, { username: payload.username, password: payload.password });
        if (!res.data) throw new Error('Incorrect Login');
        commit('setUser', res.data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
})

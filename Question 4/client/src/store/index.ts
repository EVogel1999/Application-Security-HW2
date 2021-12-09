import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = process.env.VUE_APP_API_URL;

export default new Vuex.Store({
  state: {
    messages: [] as string[]
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages;
    },
  },
  actions: {
    async createMessage({ dispatch }, payload: { message: string },) {
      try {
        const res = await axios.post(`${API_URL}/messages`, { message: payload.message });
        if (!res.data) throw new Error('Incorrect Login');
        await dispatch('getMessages');
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async getMessages({ commit }) {
      try {
        const res = await axios.get(`${API_URL}/messages`);
        commit('setMessages', res.data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
})

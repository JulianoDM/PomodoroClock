import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backColor: {
      default: "red accent-2",
      short: "teal lighten-1",
      long: "light-blue accent-4",
    },

    pomodoro: {
      name:'Pomodoro' , minutes: 25, seconds:0, pomodoro:25, error:500
    },

    short:{
      name: 'Short Break' , minutes: 5, seconds:0, short: 5
    },

    long:{
      name: 'Long Break' , minutes: 15, seconds:0, long: 15
    },

    timer: {
      minutes: 25,
      seconds: 0,
    },

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

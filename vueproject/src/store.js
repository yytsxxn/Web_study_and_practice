import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    photoList:[]
  },
  mutations: {
    addPhoto(state,photo){
      state.photoList = [...photo]
    }
  },
  actions: {

  },
});

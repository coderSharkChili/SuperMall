import { createStore } from 'vuex'
import actions from './actions';
import mutations from './mutations';
import getters from './getters'

export default createStore({
  state: {
    cartList:[],
  },
  mutations,//mutations唯一的目的就是修改 state中的状态  里面的每个方法完成的事件尽可能单一一点
  actions,
  getters,
  modules: {
  }
})


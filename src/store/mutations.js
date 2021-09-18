import {
    ADD_COUNTER,
    ADD_TO_CART} 
    from './mutations-types'
    
export default {
    // addCount(state,payload){
    //     payload.count++;
    //   },
    //   addToCart(state,payload){
    //     state.cartList.push(payload)
    //   }
    [ADD_COUNTER](state,payload){
        payload.count++;
      },

      [ADD_TO_CART](state,payload){
        payload.checked = true
        state.cartList.push(payload)
      }
}
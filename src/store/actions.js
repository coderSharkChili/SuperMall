import {
  ADD_COUNTER,
  ADD_TO_CART} 
  from './mutations-types'

export default {
    addCart(context,payload){
      return new Promise((resolve, reject) =>{
          // payload新添加的商品
        // 1.查找之前数组中是否有该商品
        let oldProduct = null;
        for(let item of context.state.cartList){
          if(item.iid === payload.iid){
            oldProduct = item;
          }
        }
        // 2. 判断oldProduct
        if(oldProduct){ // 数量加一
          // oldProduct.count += 1

          // context.commit('addCount',oldProduct)
          context.commit(ADD_COUNTER, oldProduct)
          resolve('当前商品数量加一')

        } else{ // 添加了新商品
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit(ADD_TO_CART, payload)
          resolve('添加了新商品')
        }
      })
      }
}
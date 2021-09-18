import Toast from "./Toast"

const obj={}
// 注意  这是 Vue2.x 自定义插件的方式
obj.install=function(Vue){
    // console.log('执行了obj自定义插件',Vue);

    //1.创建组件构造器
    // const toastContrustor = Vue.extend(Toast) //vue3.x 弃用了 extend
    const toastContrustor = Vue.extends(Toast)
    // 2. new 的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()
    // 3. 将组件对象，手动挂载到某一个元素上
    toast.$mount(doucument.createElement('div'))
    // 4. toast.$el 对应的就是 div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj
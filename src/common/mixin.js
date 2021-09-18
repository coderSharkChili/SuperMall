import {debounce} from 'common/util' //导入防抖函数
import emitter from '@/eventbus';// 导入 事件总线 插件需要先安装 "mitt": "^3.0.0",

export const itemListenerMixin={
    component:{
        
    },
    methods: {
        
    },
    data(){
        return{
            itemImgListener:null,
        }
    },
   mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,100)

    this.itemImgListener = ()=>{
         refresh()
     }
    emitter.on('itemImageLoad',this.itemImgListener)
    console.log('我是混入的内容');
   },
}
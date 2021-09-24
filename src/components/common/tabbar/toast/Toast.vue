<template>
    <div class="toast" v-show="isShow">
        {{message}}
    </div>
</template>

<script>
export default {
    name:'Toast',
    // props:{
    //     message:{
    //         type:String,
    //         default(){
    //             return ''
    //         }
    //     },
    //     show:{
    //         type:Boolean,
    //         default:false
    //     }
    // },
    data(){
        return{
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message, duration){
            this.message = message
            this.isShow = true

            setTimeout(()=> {
                this.message = ''
                this.isShow = false
            }, duration)
        }
    }
}
</script>

<style scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;

    z-index: 999;

    transform: translate(-50%, -50%);
    padding: 15px 20px;
    color: #fff;
    background-color: rgba(0,0,0, 0.7)
}
</style>
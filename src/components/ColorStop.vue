<template>
    <div class="color-stop" :style="{backgroundColor:curColor,left:stopLeft}" @click.stop="showPicker = true">
        <chrome-picker :value="curColor" @input="updateColor"  v-if="showPicker" v-click-outside="hidePicker" class="picker"/>
    </div>
</template>
<script>
import {Chrome} from 'vue-color';
export default {
    props:{
        color:{
            type:String,
            required:true
        },
        val:{
            type:Number,
            required:true
        }
    },
    data:()=>({
        curColor:null,
        showPicker:false
    }),
    mounted(){
        this.curColor = this.color
    },
    methods:{
        hidePicker(){
            this.showPicker = false
        },
        updateColor({hex}){
            this.curColor = hex
            this.$emit('update-color',this.curColor)
        }
    },
    computed:{
        stopLeft(){
            return `${(this.val + 1)*50}%`
        }
    },
    components:{
        'chrome-picker':Chrome
    }
}
</script>
<style>
.color-stop{
    height:10px;
    width:10px;
    border: 2px solid #aaaaaa;
    position: absolute;
    transform: translate(-50%,0);
}
.picker{
    position:relative;
    left: 15px;
    top:15px;
}
</style>
<template>
    <div class="color-stop" :style="{backgroundColor:curColor,left:stopLeft}" @click="enablePicker" :class="{'ghost':ghost}" v-click-outside="hidePicker" >
        <chrome-picker :value="curColor" @input="updateColor"  v-if="showPicker"  class="picker"/>
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
        },
        ghost:{
            type:Boolean
        }
    },
    data:()=>({
        tmpColor:undefined,
        showPicker:false,
    }),
    
    methods:{
        hidePicker(){
            if(this.showPicker){
                this.showPicker = false
                this.$emit('update-color',this.curColor)
            }
        },
        updateColor({hex}){
            this.tmpColor = hex
        },
        enablePicker(){
            if(!this.ghost){
                this.showPicker = true;
            }
        }
    },
    computed:{
        stopLeft(){
            return `${(this.val + 1)*50}%`
        },
        curColor(){
            return (typeof this.tmpColor !== 'undefined')? this.tmpColor : this.color
        }
    },
    components:{
        'chrome-picker':Chrome
    }
}
</script>
<style>
.color-stop{
    height:15px;
    width:15px;
    box-sizing: border-box;
    border: 2px solid #aaaaaa;
    position: absolute;
    transform: translate(-50%,0);
}
.color-stop:not(.ghost){
    cursor: pointer;
}
.picker{
    position:relative;
    left: 15px;
    top:15px;
}
.ghost{
    opacity: 0.5;
    
}
</style>
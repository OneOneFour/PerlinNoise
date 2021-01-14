<template>
    <div class="color-stop" :style="{backgroundColor:curColor,left:stopLeft}" @click.stop="enablePicker" :class="{'ghost':ghost}" v-click-outside="hidePicker">
        <chrome-picker :value="curColor" @input="updateColor"  v-if="showPicker"  class="picker"/>
    </div>
</template>
<script>
import {Chrome} from 'vue-color';
import Vue from 'vue';
const stopBus = new Vue();
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
    mounted(){
        stopBus.$on('picker-select',(id)=>{
            if(id !== this._uid) this.showPicker = false;
        })
        window.addEventListener('keydown',(e)=>{
            if(e.key=='Enter' || e.key == 'Escape' || e.key == 'Esc') this.showPicker = false
        })
    },
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
                stopBus.$emit('picker-select',this._uid)
                this.$emit('disable-track')
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
    z-index:10;
}
.ghost{
    opacity: 0.5;
    
}
</style>
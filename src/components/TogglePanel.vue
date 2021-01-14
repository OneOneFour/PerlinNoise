<template>
    <div class="toggle-panel-wrapper" :style="{'color':fontColor,'order': (toggle)? -1: 0 }">
        <div class="panel toggle-panel" v-if="toggle">
            <div class="panel-header" @click="toggle = false" :style="{'backgroundColor':color}"><font-awesome-icon :icon="icon" size="lg" /> <span class="panel-title">{{title}}</span><font-awesome-icon icon="times-circle" size="lg" /></div>
            <div class="panel-content">
                <slot>Toggle Content</slot>
            </div>
        </div>
        <div class="toggle-icon" v-else @click="toggle=true" @mouseenter="hover=true" @mouseleave="hover=false" :style="{'backgroundColor':color}"> 
            <div class="icon-wrapper">
                <font-awesome-icon :icon="icon" size="2x"/>
            </div>
            <div class="toggle-hover-description" :style="{'backgroundColor':color,'color':fontColor}">
                {{title}}
            </div>
        </div>
    </div>
</template>
<script>
import {islight} from '@/js/utils.js';
export default {
    props:{
        icon:{
            type:String
        },
        title:{
            type:String
        },
        color:{
            type:String,
            default:"#333333"
        },
        show:{
            type:Boolean,
            default:false
        }
    },
    data:()=>({
        toggle: false,
        hover:false
    }),
    mounted(){
        this.toggle = this.show
    },
    computed:{
        fontColor(){
            return islight(this.color)? 'black' : 'white';
        }
    }
}
</script>
<style>
.toggle-icon{
    height: 4rem;
    width: 4rem;
    border-radius:50px;
    margin: 0.5rem;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
    position:relative;
    cursor:pointer;
}
.toggle-icon:hover>.toggle-hover-description{
    display:block;
}
.icon-wrapper{
    text-align: center;
    padding: 1rem 0;
    position: relative;
    z-index:1;
}
.panel-header{
    cursor: pointer;
    display:flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 15px 15px 0 0 ;
}
.panel-header>span{
    display:inline-block;
}
.panel-title{
    font-size:1rem;
    flex-grow:1;
    margin: 0 0.5rem;
}
.toggle-hover-description{
    display:none;
    position: absolute;
    left:50%;
    padding: 0.25rem;
    padding-left:2.25rem;
    padding-right:0.5rem;
    top:calc(25% - 0.25rem);
    white-space: nowrap;
    height: 2rem;
    line-height: 2rem;
    
}
.toggle-hover-description:after{
    content:"";
    position:absolute;
    z-index:-1;
    left:0;
    top:0;
    width:100%;
    height:100%;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
}
.panel-content{
    border-radius: 0 0 15px 15px;
    padding: 0.5rem;
}
.toggle-panel-wrapper{
    z-index:1;
}
</style>
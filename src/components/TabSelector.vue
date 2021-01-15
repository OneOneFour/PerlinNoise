<template>
    <div class="tab-selector">
        <div class="tab-picker">
            <div class="tab-picker-item" v-for="(name,i) in names" :style="tabStyle(i)"  :key=i @click="changeTab(i)" >{{name}}</div>
        </div>
        <div class="tab-content">
            <component :is="this.currentTab"/>
        </div>
    </div>
</template>
<script>
import { islight } from '@/js/utils'
export default {
    inject:['groupColor'],
    props:{
        tabs:{
            type:Array,
            required:true
        },
        names:{
            type:Array,
            required:true
        },
        default:{
            type:Number,
            default:0
        },
        color:{
            type:String,
            default(){ 
                return this.groupColor
            }
        }
    },
    data:()=>({
        current:0
    }),
    computed:{
        currentTab(){
            return this.tabs[this.current]
        },
    },
    methods:{
        changeTab(i){
            this.current=i
            this.$emit('changetab',this.names[i])
        },
        tabStyle(i){
            if(i == this.current){
                return {backgroundColor:this.color,color:islight(this.color)? 'black':'white'}
            }
            return {}
        }
    }
}
</script>
<style>
.tab-picker{
    display:flex;
    justify-content: space-between;
}
.tab-picker-item{
    flex:1 1 auto;
    background: #888;
    text-align:center;
    padding: 5px 0 ;
    cursor: pointer;
}
.tab-picker-item:hover{
    background:#999;
}
.tab-content{
    backdrop-filter: brightness(80%); 
    background-color: rgba(51,51,51,0.4);
    border-radius: 0 0 15px 15px;
}
</style>

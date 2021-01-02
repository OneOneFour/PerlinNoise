<template>
    <div class="tab-selector">
        <div class="tab-picker">
            <div class="tab-picker-item" v-for="(name,i) in names" :class="{'tab-active':current==i}" :key=i @click="changeTab(i)" >{{name}}</div>
        </div>
        <component :is="this.currentTab"/>
    </div>
</template>
<script>
export default {
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
        }
    },
    data:()=>({
        current:0
    }),
    computed:{
        currentTab(){
            return this.tabs[this.current]
        }
    },
    methods:{
        changeTab(i){
            this.current=i
            this.$emit('changetab',this.names[i])
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
    background:#ddd;
}
.tab-picker-item.tab-active{
    background:#ddd;
}
</style>

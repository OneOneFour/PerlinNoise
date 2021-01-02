<template>
    <div class="control_pane">
      <div class="control-group">
        <h3 class="control-pane-title">Perlin Noise Generator</h3>
        <button @click="emitRegenerate"> Regenerate </button>
        <button @click="$emit('toggle-detail')"> {{(showDetail)? 'Hide':'Show'}} detail </button>
      </div>
      <div class="resolution-group">
        <p class="control-text">Resolution: {{perlinResolution}} pixels</p>
        <input type="range" min="1" max="50" step="1" v-model.number="perlinResolution" />
      </div>
      <tab-selector :tabs="getComponentArray" :names="['Manual','Auto']" @changetab="tabChanged"/>

    </div>
</template>
<script>
import OctaveManual from './OctaveManual.vue';
import OctaveAuto from './OctaveAuto.vue';
import TabSelector from './TabSelector.vue';
import OctaveStore from '../js/OctaveStore.js';
export default {
    data:()=>({
        perlinResolution:10
    }),
    components:{
      TabSelector
    },
    props:{
        showDetail:{type:Boolean}
    },
    computed:{
      getComponentArray(){
        return [OctaveManual,OctaveAuto]
      }
    },
    methods:{
      emitRegenerate(){
        this.$emit('regenerate',{octaves:OctaveStore.octaves,perlinResolution:this.perlinResolution})
      },
      tabChanged(newMode){
        OctaveStore.setMode(newMode.toLowerCase())
      }
    } 
}
</script>
<style>
.control_pane{
  position: absolute;
  background:white;
  left:10px;
  top:10px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
}
.control-pane-title{
  display:inline-block;
  margin:0;
}
.control-group{
  padding:10px;
}
.control-group button{
  margin:0 10px;
  float:right;
}
.control-text{
  display:inline;
}
</style>

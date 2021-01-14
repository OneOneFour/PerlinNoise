<template>
    <div class="control_group">
      <div class="main-panel panel">
        <h2 class="main-panel-title">Perlin Noise Generator  <button @click="emitRegenerate" class="button regenerate"><font-awesome-icon icon="redo"/><span>Regenerate</span></button></h2>
        <div class="panel-content main-panel-content">
          <seed-generator @input="seed=$event" /> 
          <button class="button download" @click.prevent="$emit('download')" ><font-awesome-icon icon="download"/><span>Download Image</span></button>
        </div>
      </div>
      <toggle-panel title="Colormap Settings" icon="palette" style="z-index:10;">
        <color-map-picker v-on="$listeners" />
      </toggle-panel>
      <toggle-panel title="Generation Settings" icon="cogs">
        <generation-settings v-on="$listeners"/>
      </toggle-panel>
    </div>
</template>
<script>
import ColorMapPicker from './ColourmapPicker.vue';
import GenerationSettings from './GenerationSettings.vue';
import SeedGenerator from './SeedGenerator.vue';
import TogglePanel from './TogglePanel.vue';
import OctaveStore from '@/js/OctaveStore.js';
export default {
    data:()=>({
        seed:null
    }),
    components:{
      GenerationSettings,
      ColorMapPicker,
      TogglePanel,
      SeedGenerator
    },
    methods:{
      emitRegenerate(){
        this.$emit('regenerate',{octaves:OctaveStore.octaves,perlinResolution:OctaveStore.perlinResolution,seed:this.seed})
      },
    },
    mounted(){
      this.$nextTick(()=> this.emitRegenerate());
    }
}
</script>
<style>
.control_group{
  display:flex;
  flex-direction: column;
  position:absolute;
  left:0;
  width:30rem;
  top:0;
}
.main-panel{
  order:-1;
}
.main-panel-title{
  background:#333;
  border-radius: 15px 15px 0 0;
  padding: 0.3rem 0.6rem;
  color:white;
  margin:0;
}
.main-panel-content{
  display:flex;
  justify-content: space-between;
}
.button.regenerate{
  float:right;
  background-color: #c0392b;
}
.button.download{
  padding-left:0.5rem;
  background-color:#9b59b6;
}
.button.download:hover{
  background-color:#8e44ad;
}
.button.button.regenerate:hover{
  background-color:#9a2e22;
}
@supports  not((backdrop-filter: blur(40px)) or (-webkit-backdrop-filter: blur(40px))){
  .panel{
      background: rgba(0, 0, 0, 0.25);
  }
}
@supports  (backdrop-filter: blur(40px)) or (-webkit-backdrop-filter: blur(40px)){
  .panel{
    backdrop-filter: blur(40px) brightness(75%);
    -webkit-backdrop-filter: blur(40px) brightness(75%);
  }
}

</style>

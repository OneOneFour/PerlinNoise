<template>
    <div class="generation-group">
        <div class="resolution-group">
            <p class="control-text">Resolution: {{perlinResolution}} pixels</p>
            <input type="range" min="1" max="50" step="1" :value="perlinResolution" @input="updatePerlinResolution" />
        </div>
        <tab-selector :tabs="getComponentArray" :names="['Manual','Auto']" @changetab="tabChanged"/>
    </div>
</template>
<script>
import OctaveAuto from './OctaveAuto.vue';
import TabSelector from './TabSelector.vue';
import OctaveStore from '@/js/OctaveStore.js';
import OctaveManual from './OctaveManual.vue';
export default {
    components:{
        TabSelector,
    },
    computed:{
      getComponentArray(){
        return [OctaveManual,OctaveAuto]
      }
    },
    data:()=>({
        perlinResolution:OctaveStore.perlinResolution
    }),
    methods:{
        tabChanged(newMode){
            OctaveStore.setMode(newMode.toLowerCase())
        },
        updatePerlinResolution(e){
            OctaveStore.perlinResolution = parseInt(e.target.value)
        }
    }
       
}
</script>
<style>

</style>
<template>
    <div class="generation-group">
        <div class="resolution-group">
            <div class="control-text">Resolution - {{store.perlinResolution}} pixels</div>
            <input type="range" min="1" max="50" step="1" :value="store.perlinResolution" @input="updatePerlinResolution" class="resolution-range" />
            <div class="resolution-warning warning" v-if="store.perlinResolution < 5">
                <h4><font-awesome-icon icon="exclamation-triangle"/> Warning!</h4>
                <p>Fine perlin resolutions make take a while to generate and may crash your browser on systems with low memory.</p>
            </div>
        </div>
        <tab-selector :tabs="getComponentArray" :names="['Manual','Auto']" @changetab="tabChanged" />
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
        store:OctaveStore
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
.resolution-warning{
    border-radius: 10px;
    margin: 0.5rem 0;
}
.resolution-warning p{
    margin: 0.15rem 0.35rem;
    font-size:0.8rem;
}
.resolution-warning h4{
    margin: 0.15rem 0.35rem;
    font-size:1rem;
}
.resolution-group{
    margin-bottom: 0.5rem;
    width: 15rem;
}
.resolution-range{
    width:100%;
}
</style>
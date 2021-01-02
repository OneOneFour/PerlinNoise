<template>
    <div class="octave-auto">

        <div class="maxfeatureSize">
            <label>Max Feature Size ({{autoState.maxFeatureSize}})</label>
            <input type="range" min=50 max=500 step=25 value=200 v-model.number="autoState.maxFeatureSize"/>
        </div>
        <div class="maxfeatureSize">
            <label>Number of Octaves ({{autoState.numOctaves}})</label>
            <input type="range" min=1 max=10 step=1 value=4 v-model.number="autoState.numOctaves"/>
        </div>
        <div class="falloff">
            <label>Lacunarity </label>
            <input type="number" min=1 max=5 step=0.25 value=2 v-model.number="autoState.lacunarity"/>
        </div>
        <div class="persistance">
            <label>Persistance </label>
            <input type="number" min=0 max=3 step=0.25 value=1 v-model.number="autoState.persistance" />
        </div>
    </div>
</template>
<script>
import OctaveStore from '../js/OctaveStore';
export default {
    data:()=>({
        autoState:OctaveStore.autoState
    })
} 
</script>
<style>

</style>
<template>
    <div class="octave-manual">
        <div class="octave-group" v-for="(octave,i) in manualState.octaves" :key=i>
            <p class="control-text">Pixels per Corner: {{octave.pixelsPerCorner}} pixels</p>
            <input type="range" min="5" max="200" step="5" v-model.number="octave.pixelsPerCorner" />
            <p class="control-text">Weight:</p>
            <input type="number" min="0.01" max="2" step="0.1" v-model.number="octave.weight" />
            <button v-if="manualState.octaves.length > 1" @click="deleteOctave(i)">X</button>
        </div>
        <button @click="addOctave"> + </button>
    </div>
</template>
<script>
import OctaveStore from '@/js/OctaveStore.js';
export default {
    data:()=>({
        manualState:OctaveStore.manualState,
    }),
    methods:{
        deleteOctave(i){
            OctaveStore.manualState.deleteOctave(i)
        },
        addOctave(){
            OctaveStore.manualState.addOctave(100,1)
        }
    }
}
</script>
<style>

</style>
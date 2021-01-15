<template>
    <div class="octave-manual">
        <div class="octave-group" v-for="(octave,i) in manualState.octaves" :key=i>
            <div class="octave-title">
                Octave #{{i+1}}
                <font-awesome-icon icon="times-circle" class="close-button"  v-if="manualState.octaves.length > 1" @click="deleteOctave(i)"></font-awesome-icon >
            </div>
            <div class="octave-content">
                <div class="pixel-per-corner-group">
                <div class="control-text">Pixels per Corner: {{octave.pixelsPerCorner}} pixels</div>
                <input type="range" min="5" max="200" step="5" v-model.number="octave.pixelsPerCorner" />
            </div>
            <span class="control-text">Weight: </span>
            <input type="number" min="0.01" max="2" step="0.1" v-model.number="octave.weight" />
            
            </div>
           
        </div>
        <font-awesome-icon icon="plus-circle" class="add-button" @click="addOctave"> + </font-awesome-icon >
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
.octave-manual{
    padding: 0.75rem;
    display:flex;
    flex-direction: column;
    max-height:50vh;
    overflow:auto;
}
.octave-group{
    border-radius:15px;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.35);
    background-color: rgba(51,51,51,0.5);
    width:15rem;
    margin-bottom: 1rem;
}
.octave-title{
    border-radius: 15px 15px 0 0;
    padding: 0.25rem 0.75rem;
}
.octave-content{
    padding:0.5rem 0.75rem;
}
.close-button{
    cursor: pointer;
    float:right;
}
.octave-title{
    background-color: #333;
}
.add-button{
    cursor:pointer;
    padding: 0.5rem;
    border-radius: 50%;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.35);
    background-color:#333;
}
</style>
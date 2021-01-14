// TODO: Change to follow singleton pattern as seen in ColorStore.js

import {clamp} from './utils.js';
let manualState = {
    octaves:[{pixelsPerCorner:100,weight:1}],
    addOctave(pixelsPerCorner,weight){
        this.octaves.push({pixelsPerCorner,weight})
    },
    deleteOctave(idx){
        this.octaves.splice(idx,1)
    }
}
let autoState = {
    persistance:0.25,
    lacunarity:2.0,
    maxFeatureSize:200,
    numOctaves:4,
    get octaves(){
        let octaves = []
        for(let i =0; i < this.numOctaves;i++){
            octaves.push({pixelsPerCorner:clamp(this.maxFeatureSize/(Math.pow(this.lacunarity,i)),1),weight: 1.0 * Math.pow(this.persistance,i)})
        }
        return octaves
    }
}
export default{
    debug:true,
    autoState,
    manualState,
    mode:'manual',
    perlinResolution:10,
    get octaves(){
        if(this.mode=='auto') return this.autoState.octaves
        return this.manualState.octaves
    },
    setMode(newMode){
        this.mode = newMode;
    }
}

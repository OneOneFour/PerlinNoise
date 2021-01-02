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
    lacunarity:1,
    maxFeatureSize:200,
    numOctaves:4,
    get octaves(){
        let octaves = []
        for(let i =0; i < this.numOctaves;i++){
            octaves.push({pixelPerCorner:this.maxFeatureSize/(Math.pow(this.lacunarity,i)),weight: 1.0 * Math.pow(this.persistance,i)})
        }
        return octaves
    }
}

export default{
    debug:true,
    autoState,
    manualState,
    mode:'manual',
    get octaves(){
        if(this.mode=='auto') return this.autoState.octaves
        return this.manualState.octaves
    },
    setMode(newMode){
        this.mode = newMode;
    }
}


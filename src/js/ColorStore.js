import { generateColormap } from "./utils"

const _data = {
    blend:1,
    stops:[
        {val:-1,color:'#0000ff'},
        {val:1,color:'#ff0000'}
    ],
}
_data.map = generateColormap(_data.stops,_data.blend)

const ColorStore = {
    get blend() { return _data.blend},
    get stops() { return _data.stops},
    get map() { return _data.map },
    setBlend(val){
        _data.blend = val
        _data.map = generateColormap(_data.stops,_data.blend)
    },
    updateStopColor(i,newVal){
        _data.stops[i].color=newVal
        _data.map = generateColormap(_data.stops,_data.blend)
    }
}
Object.freeze(ColorStore);
export default ColorStore;
import PerlinGrid from './PerlinGrid.js';
import seedrandom from 'seedrandom';
self.addEventListener('message',(e) => {
    let {width,height,perlinResolution,octaves,seed} = e.data;
    // Work out the smallest grid needed to span the screen
    seedrandom(seed,{global:true}) 
    let renderWidth = Math.ceil(width/perlinResolution) * perlinResolution
    let renderHeight = Math.ceil(height/perlinResolution) * perlinResolution
    let perlinGrid = new PerlinGrid(renderWidth,renderHeight,octaves) 
    // Iterating this way prevents any out of range exceptions
    self.postMessage(perlinGrid.getGrid(perlinResolution)) // Return ImageData Object
})


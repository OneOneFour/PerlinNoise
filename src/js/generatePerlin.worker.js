import PerlinGrid from './PerlinGrid.js';
import {valToColorRGB} from './utils.js';
self.addEventListener('message',(e) => {
    let {width,height,perlinResolution,octaves} = e.data;
    // Work out the smallest grid needed to span the screen 
    let renderWidth = Math.ceil(width/perlinResolution) * perlinResolution
    let renderHeight = Math.ceil(height/perlinResolution) * perlinResolution
    let perlinGrid = new PerlinGrid(renderWidth,renderHeight,octaves) 
    let pixelData = new Uint8ClampedArray(width*height*4);
    // Iterating this way prevents any out of range exceptions
    for(let x= perlinResolution/2; x < renderWidth; x+=perlinResolution){
        for(let y=perlinResolution/2; y < renderHeight; y+=perlinResolution){
            let v = perlinGrid.perlin(x,y)
            let {r,b} = valToColorRGB(v)
            for(let y_i = Math.floor(y - perlinResolution/2); y_i < Math.ceil(y + perlinResolution/2) && y_i < height;y_i++ ){
                for(let x_i = Math.floor(x - perlinResolution/2); x_i < Math.ceil(x + perlinResolution/2) && x_i < width ; x_i++){
                    let i = 4*(x_i + y_i*width)
                    //Calcualte the pixel data manually lol
                    pixelData[i] = r
                    pixelData[i+1] = 0
                    pixelData[i+2] = b
                    pixelData[i+3] = 255
                }
            }
        }
    }
    let imageData = new ImageData(pixelData,width)
    self.postMessage(imageData) // Return ImageData Object
})


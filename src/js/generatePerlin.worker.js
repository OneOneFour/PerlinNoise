import PerlinGrid from './PerlinGrid.js';
import {valToColorRGB} from './utils.js';
self.addEventListener('message',(e) => {
    let {width,height,perlinResolution,octaves} = e.data;
    let perlinGrid = new PerlinGrid(width,height,octaves)
    let pixelData = new Uint8ClampedArray(width*height*4); // LTR Downwards
    for(let x= perlinResolution/2; x < width+perlinResolution; x+=perlinResolution){
        for(let y=perlinResolution/2; y < height+perlinResolution; y+=perlinResolution){
            let v = perlinGrid.perlin(x,y)
            let {r,b} = valToColorRGB(v)
            for(let y_i = y - perlinResolution/2; y_i < y + perlinResolution/2;y_i++ ){
                for(let x_i = x - perlinResolution/2; x_i < x + perlinResolution/2; x_i++){
                    let i = 4*(x_i + y_i*width)
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


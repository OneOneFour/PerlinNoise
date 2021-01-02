
import {smootherstep,genRandomUnit,dotProduct} from './utils.js';

class PerlinOctave2D{
    constructor(gridX,gridY,pixelsPerCorner){
        this.corners =[];
        this.gridX = gridX
        this.gridY = gridY
        this.pixelPerCorner = pixelsPerCorner;
        // Grid dimensions have 1 added to them to account for the fact than n rows has n + 1 corners and vice versa
        for(let i =0; i < (this.gridX+1)*(this.gridY+1); i++){
            this.corners.push(genRandomUnit())
        }
    }
    getCorner(ix,iy){
        if(ix > this.gridX || iy > this.gridY) throw `Outside of range: ix:${ix}, gridX:${this.MathgridX}\niy:${iy}, gridY:${this.gridY}`
            return this.corners[ix + iy*(this.gridX+1)];
      }
    perlin(x,y){// x,y in PIXEL space now
        let x_local = x/this.pixelPerCorner;
        let y_local = y/this.pixelPerCorner;
        let x0 = Math.floor(x_local)
        let x1 = x0 + 1
        let y0 = Math.floor(y_local)
        let y1 = y0 + 1
    
        let n00 = dotProduct({x:x_local-x0,y:y_local-y0},this.getCorner(x0,y0)) 
        let n01 = dotProduct({x:x_local-x0,y:y_local-y1},this.getCorner(x0,y1))
        let n10 = dotProduct({x:x_local -x1,y:y_local - y0},this.getCorner(x1,y0))
        let n11 = dotProduct({x:x_local -x1,y:y_local- y1},this.getCorner(x1,y1))
        let x0Interp =smootherstep(n00,n10,x_local-x0)
        let x1Interp = smootherstep(n01,n11,x_local-x0)

        return smootherstep(x0Interp,x1Interp,y_local-y0)
    }
}
export default PerlinOctave2D;
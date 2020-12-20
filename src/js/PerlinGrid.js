import {smootherstep,genRandomUnit,dotProduct} from './utils.js';
class PerlinGrid{
    // TODO: generalise to N dimensions
    constructor(gridX,gridY){
      this.corners = [];
      this.gridX = gridX;
      this.gridY = gridY;
      for(let i=0; i < (this.gridX+1)*(this.gridY+1);i++){
          this.corners.push(genRandomUnit())
      }
    }
    getCorner(ix,iy){
      if(ix > this.gridX || iy > this.gridY) throw "Outside of range"
          return this.corners[ix + iy*(this.gridX+1)];
    }
    perlin(x,y){
      let x0 = Math.floor(x)
      let x1 = x0 + 1
      let y0 = Math.floor(y)
      let y1 = y0 + 1
  
      let n00 = dotProduct({x:x-x0,y:y-y0},this.getCorner(x0,y0)) 
      let n01 = dotProduct({x:x-x0,y:y-y1},this.getCorner(x0,y1))
      let n10 = dotProduct({x:x -x1, y:y - y0},this.getCorner(x1,y0))
      let n11 = dotProduct({x:x -x1,y:y- y1},this.getCorner(x1,y1))
  
      let x0Interp =smootherstep(n00,n10,x-x0)
      let x1Interp = smootherstep(n01,n11,x-x0)
  
      return smootherstep(x0Interp,x1Interp,y-y0)
    }
}
export default PerlinGrid;
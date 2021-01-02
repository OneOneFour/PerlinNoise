import PerlinOctave2D from './PerlinOctave.js';
class PerlinGrid2D{
    // TODO: generalise to N dimensions
    constructor(width,height,octaves,perlinResolution){
      this.width = width
      this.height = height
      this.weightSum = octaves.reduce( (acc,cur) =>acc + cur.weight ,0)
      this.octaves = octaves.map( (o) => ({
        ...o,
        grid:  new PerlinOctave2D(Math.ceil(Math.ceil(width/perlinResolution) * perlinResolution / o.pixelsPerCorner),Math.ceil(Math.ceil(height/perlinResolution) * perlinResolution / o.pixelsPerCorner),o.pixelsPerCorner)
      }))
    }
    perlin(x,y){
      return this.octaves.map( (o) => o.grid.perlin(x,y)*o.weight/this.weightSum)
                         .reduce( (acc,cur) => cur + acc , 0);
    }
}
export default PerlinGrid2D;
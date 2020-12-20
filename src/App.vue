<template>
  <div id="app">
    <canvas ref="perlincanvas" :width="width" :height="height"></canvas>
    <control-pane @regenerate="recalculate" @toggle-detail="showDetail = !showDetail" />
    <p v-if="loading" class="loading-pane">Loading...</p>
  </div>
</template>

<script>
function genRandomUnit(){
  let x = Math.random()*2 -1
  let y = Math.random()*2 -1
  let mag = Math.sqrt(x*x + y*y)
  return {x:x/mag,y:y/mag}
}
function dotProduct(a,b){
  return a.x*b.x+ a.y*b.y
}
function smootherstep(a0,a1,w){
  return a0 + (a1-a0)*(6*w*w*w*w*w - 15*w*w*w*w + 10 * w*w*w)
}

function valToColor(val){
    let clamp_val = Math.min(Math.max(val,-1),1)
    return `rgba(${Math.round(((clamp_val + 1)*255/2))},0,${Math.round((1 - clamp_val)*255/2)},255)`
}

class PerlinGrid{
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


import ControlPane from './components/ControlPane.vue'
export default {
  name: 'App',
  components:{
    ControlPane
  },
  data:()=>({
    loading:true,
    showDetail:false,
    perlinResolution:10,
    pixelPerCorner:100,
    perlinGrid:undefined,
    width:undefined,
    height:undefined,
    ctx:undefined
  }),
  mounted(){
    this.ctx = this.$refs.perlincanvas.getContext('2d')
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.$nextTick(()=>{this.init()})
  },
  methods:{
    recalculate({perlinResolution,pixelPerCorner}){
      this.loading = true
      setTimeout( ()=>{
        this.perlinResolution = perlinResolution
        this.pixelPerCorner = pixelPerCorner
        this.init();
      },0) // This is gross but works..
    },
    init(){
      this.corners = [];
      this.gridX = Math.ceil(this.width/this.pixelPerCorner)
      this.gridY = Math.ceil(this.height/this.pixelPerCorner)
      this.perlinGrid = new PerlinGrid(this.gridX,this.gridY)
      for(let i=0; i < (this.gridX+1)*(this.gridY+1);i++){
        this.corners.push(genRandomUnit())
      }
      this.draw();
      
    },
   
    draw(){
      this.ctx.clearRect(0,0,this.width,this.height)
      let step = this.perlinResolution/(this.pixelPerCorner);
      for(let x= step/2; x < this.gridX; x+= step){
        for(let y=step/2; y < this.gridY; y+= step){
          let v = this.perlinGrid.perlin(x,y)
          let yTopLeft = y*this.pixelPerCorner - this.perlinResolution/2
          let xTopLeft = x*this.pixelPerCorner - this.perlinResolution/2
          this.ctx.fillStyle= valToColor(v)
          this.ctx.fillRect(xTopLeft,yTopLeft,this.perlinResolution,this.perlinResolution)
          if(this.showDetail){
            this.ctx.fillStyle='#000000'
            this.ctx.fillText(v.toFixed(2),xTopLeft,yTopLeft + this.perlinResolution/2)
          }
        }
      }
      if(this.showDetail) this.drawBonus();
      this.loading=false;
    },
    drawBonus(){
      for(let x=0; x < this.gridX; x++){
        for(let y=0; y< this.gridY;y++){
          this.ctx.beginPath();
          this.ctx.strokeStyle='#000000'
          this.ctx.rect(x*this.pixelPerCorner,y*this.pixelPerCorner,this.pixelPerCorner,this.pixelPerCorner)
          this.ctx.stroke()
        }
      }
      this.corners.forEach((v,i)=>{
        let y = Math.floor(i/(this.gridX+1)) * this.pixelPerCorner;
        let x = (i % (this.gridX + 1)) * this.pixelPerCorner;
        this.ctx.beginPath();
        this.ctx.lineWidth=2;
        this.ctx.strokeStyle='#00ff00'
        this.ctx.moveTo(x,y)
        this.ctx.lineTo(x + v.x * this.pixelPerCorner,y+v.y*this.pixelPerCorner)
        this.ctx.stroke()
      })
    }
  },
  watch:{
    showDetail(){
      this.draw()
    }
  }
}
</script>

<style>
canvas{
  margin:0;
  padding:0;
}
.loading-pane{
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  background-color: white;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
  padding: 10px;
}
#app{
  margin:0;
  padding:0;
  height:100vh;
}
</style>

<template>
  <div id="app">
    <canvas ref="perlincanvas" :width="width" :height="height"></canvas>
    <control-pane @regenerate="recalculate" @toggle-detail="showDetail = !showDetail" />
    <p v-if="loading" class="loading-pane">Loading...</p>
  </div>
</template>
<script>
import {valToColor} from './js/utils.js';
import PerlinGrid from './js/PerlinGrid.js';
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
    octaves: [{pixelsPerCorner:100,weight:1.0}],
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
    recalculate({perlinResolution,octaves}){
      this.loading = true
      setTimeout( ()=>{
        this.perlinResolution = perlinResolution
        this.octaves = octaves
        this.init();
      },0) // This is gross but works..
    },
    init(){
      this.perlinGrid = new PerlinGrid(this.width,this.height,this.octaves)
      this.draw();
    },
    draw(){
      this.ctx.clearRect(0,0,this.width,this.height)
      for(let x= this.perlinResolution/2; x < this.width; x+=this.perlinResolution){
        for(let y=this.perlinResolution/2; y < this.height; y+=this.perlinResolution){
          let v = this.perlinGrid.perlin(x,y)
          let yTopLeft = y - this.perlinResolution/2;
          let xTopLeft = x - this.perlinResolution/2
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
      // TODO: Fix this! Maybe add special demonstration mode? 
      // for(let x=0; x < this.gridX; x++){
      //   for(let y=0; y< this.gridY;y++){
      //     this.ctx.beginPath();
      //     this.ctx.strokeStyle='#000000'
      //     this.ctx.rect(x*this.pixelPerCorner,y*this.pixelPerCorner,this.pixelPerCorner,this.pixelPerCorner)
      //     this.ctx.stroke()
      //   }
      // }
      // this.perlinGrid.corners.forEach((v,i)=>{
      //   let y = Math.floor(i/(this.gridX+1)) * this.pixelPerCorner;
      //   let x = (i % (this.gridX + 1)) * this.pixelPerCorner;
      //   this.ctx.beginPath();
      //   this.ctx.lineWidth=2;
      //   this.ctx.strokeStyle='#00ff00'
      //   this.ctx.moveTo(x,y)
      //   this.ctx.lineTo(x + v.x * this.pixelPerCorner,y+v.y*this.pixelPerCorner)
      //   this.ctx.stroke()
      // })
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

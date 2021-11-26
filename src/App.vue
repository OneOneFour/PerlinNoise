<template>
  <div id="app">
    <canvas ref="perlincanvas" :width="width" :height="height"></canvas>
    <control-pane @regenerate="recalculate" @toggle-detail="showDetail = !showDetail" @repaint="repaint" @download="download" />
    <p v-if="loading" class="loading-pane">Loading... <button @click="cancelJob">Cancel</button></p>
  </div>
</template>
<script>
import ControlPane from '@/components/ControlPane.vue'
import ColorStore from '@/js/ColorStore.js';
import PerlinOctave2D from '@/js/PerlinOctave';
import seedrandom from 'seedrandom';
import { toUnitVector,scaleVector,rotateVector,addVector } from './js/utils';

function drawArrowHead(ctx,{baseX,baseY,headX,headY,headSize}){
  let vector = {x: headX - baseX,y:headY - baseY};
  let unitVector = toUnitVector(vector);
  ctx.moveTo(baseX,baseY);
  ctx.lineTo(headX,headY);
  let transpose =scaleVector(rotateVector(unitVector,3*Math.PI/4),headSize);
  let transposenegative = scaleVector(rotateVector(unitVector,-3*Math.PI/4),headSize);

  let pointA = addVector({x:headX,y:headY},transpose);
  let pointB = addVector({x:headX,y:headY},transposenegative);
  ctx.lineTo(pointA.x,pointA.y);
  ctx.lineTo(pointB.x,pointB.y);
  ctx.lineTo(headX,headY);
  ctx.stroke()
}

export default {
  name: 'App',
  components:{
    ControlPane
  },
  data:()=>({
    loading:true,
    perlinResolution:undefined,
    octaves: undefined, 
    noise:[],
    renderWorker:undefined,
    width:undefined,
    height:undefined,
    seed:undefined
  }),
  mounted(){
    this.ctx = this.$refs.perlincanvas.getContext('2d')
    this.width = window.innerWidth
    this.height = window.innerHeight
  },
  methods:{
    recalculate({perlinResolution,octaves,seed}){
      this.perlinResolution = perlinResolution
      this.octaves = octaves
      this.seed = seed;
      this.init();

    },
    init(){
      this.loading = true
      this.renderWorker = new Worker('@/js/generatePerlin.worker.js',{type:'module'});
      this.renderWorker.postMessage({width:this.width,height:this.height,perlinResolution:this.perlinResolution,octaves:this.octaves,seed:this.seed})
      this.renderWorker.addEventListener('message',({data})=>{ // response is a grid of renderWidth/perlinRes x renderHeight/perlinRes
        this.noise = data.img;
        this.loading = false;
        this.renderWorker.terminate();
        this.repaint();
      });
    },
    drawBonus(){
      seedrandom(this.seed,{global:true}) 
      let renderWidth = Math.ceil(this.width/this.perlinResolution) * this.perlinResolution;
      let renderHeight = Math.ceil(this.height/this.perlinResolution) * this.perlinResolution;
      this.octaves.forEach( ({pixelsPerCorner}) => {
        let pOctave = new PerlinOctave2D(renderWidth,renderHeight,pixelsPerCorner);
        for(let x=0; x < pOctave.gridX; x++){
          for(let y=0; y< pOctave.gridY;y++){
            this.ctx.beginPath();
            this.ctx.strokeStyle='#000000'
            this.ctx.rect(x*pixelsPerCorner,y*pixelsPerCorner,pixelsPerCorner,pixelsPerCorner)
            this.ctx.stroke()
          }
        }
        pOctave.corners.forEach((v,i)=>{
          let y = Math.floor(i/(pOctave.gridX+1)) * pixelsPerCorner;
          let x = (i % (pOctave.gridX + 1)) * pOctave.pixelPerCorner;
          this.ctx.beginPath();
          this.ctx.lineWidth=2;
          this.ctx.strokeStyle='#00ff00'
          drawArrowHead(this.ctx,{baseX:x,baseY:y,headX:x + v.x * pixelsPerCorner/2,headY:y+v.y*pixelsPerCorner/2,headSize:8});
        })
      });
    },
    repaint(){
      this.ctx.clearRect(0,0,this.width,this.height)
      for(let x =0; x < this.noise.length;x++){
        for(let y=0; y < this.noise[x].length;y++){
          this.ctx.fillStyle = ColorStore.map(this.noise[x][y])
          this.ctx.fillRect(x*this.perlinResolution,y*this.perlinResolution,this.perlinResolution,this.perlinResolution)
        }
      }
      if(ColorStore.debug) this.drawBonus();
    },
    download(){
      let rawData = this.$refs.perlincanvas.toDataURL("image/png")
      let virtualLink = document.createElement("a")
      virtualLink.href = rawData
      virtualLink.download = `${this.seed} image.png`
      virtualLink.click();
    },
    cancelJob(){
      this.renderWorker.terminate();
      this.loading = false;
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

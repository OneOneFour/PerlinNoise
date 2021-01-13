<template>
  <div id="app">
    <canvas ref="perlincanvas" :width="width" :height="height"></canvas>
    <control-pane @regenerate="recalculate" @toggle-detail="showDetail = !showDetail" @repaint="repaint" :showDetail="showDetail"/>
    <p v-if="loading" class="loading-pane">Loading... <button @click="cancelJob">Cancel</button></p>
  </div>
</template>
<script>
import ControlPane from '@/components/ControlPane.vue'
import ColorStore from '@/js/ColorStore.js';
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
    noise:[],
    renderWorker:undefined,
    width:undefined,
    height:undefined,
  }),
  mounted(){
    this.ctx = this.$refs.perlincanvas.getContext('2d')
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.$nextTick(()=>{this.init()})
  },
  methods:{
    recalculate({perlinResolution,octaves}){
      this.perlinResolution = perlinResolution
      this.octaves = octaves
      this.init();
    },
    init(){
      this.loading = true
      this.renderWorker = new Worker('@/js/generatePerlin.worker.js',{type:'module'});
      this.renderWorker.postMessage({width:this.width,height:this.height,perlinResolution:this.perlinResolution,octaves:this.octaves})
      this.renderWorker.addEventListener('message',({data})=>{ // response is a grid of renderWidth/perlinRes x renderHeight/perlinRes
        this.noise = data
        this.loading = false;
        this.renderWorker.terminate();
        this.repaint();
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

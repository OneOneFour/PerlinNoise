<template>
  <div id="app">
    <canvas ref="perlincanvas" :width="width" :height="height"></canvas>
    <control-pane @regenerate="recalculate" @toggle-detail="showDetail = !showDetail" />
    <p v-if="loading" class="loading-pane">Loading... <button @click="cancelJob">Cancel</button></p>
  </div>
</template>
<script>
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
      this.renderWorker = new Worker('./js/generatePerlin.worker.js',{type:'module'});
      this.renderWorker.postMessage({width:this.width,height:this.height,perlinResolution:this.perlinResolution,octaves:this.octaves})
      this.renderWorker.addEventListener('message',(response)=>{
        this.ctx.clearRect(0,0,this.width,this.height)
        this.ctx.putImageData(response.data,0,0)
        this.loading = false;
        this.renderWorker.terminate();
      });
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

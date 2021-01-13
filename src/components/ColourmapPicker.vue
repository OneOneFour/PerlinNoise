<template>
    <div class="colormap-picker">
        <h3>Colourmap Picker</h3>
        <span>Blend</span>
        <input type=range min=0 max=1 step=0.05 :value="colorstore.blend" @input="setBlend"/>
        <div class="colorbox" ref="colorbox">
            <div class="stop-map">
                <color-stop v-for="(stop,i) in colorstore.stops" :val=stop.val :color=stop.color :key=i @update-color="changeColor(i,$event)"/>
            </div>
            <canvas ref=colorband class="colorband" :width="canvasWidth" :height="canvasHeight" />
        </div>        
    </div>    
</template>
<script>
import ColorStop from './ColorStop.vue';
import ColorStore from '@/js/ColorStore.js';
export default {
    components:{
        ColorStop
    },
    data:()=>({
        colorstore:ColorStore,
        canvasWidth:240,
        canvasHeight:40,
        ctx: null,
    }),
    mounted(){
        // this.canvasWidth = this.$refs.colorbox.getBoundingClientRect().width
        // this.canvasHeight = this.$refs.colorbox.getBoundingClientRect().height - 15;
        this.ctx = this.$refs.colorband.getContext('2d')
        this.repaint();
    },
    methods:{
        repaint(){
            requestAnimationFrame(this.repaint)
            this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
            for(let i=0; i <= this.canvasWidth; i++){
                let v = 2*i/this.canvasWidth - 1
                this.ctx.fillStyle=this.colorstore.map(v)
                this.ctx.fillRect(i,0,1,this.canvasHeight)
            }
        },
        setBlend({target}){
            ColorStore.setBlend(target.value)
            this.$emit('repaint');
        },
        changeColor(i,e){
            ColorStore.updateStopColor(i,e)
            this.$emit('repaint')
        }
    }
}
</script>
<style>
.colormap-picker{
    position:absolute;
    background:white;
    left: calc(100% + 10px);
    box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
    padding:10px;
    width: 250px;
}
.colormap-picker > h3{
    margin:0;
    padding:0;
}
.stop-map{
    position:relative;
    height:15px;
}
.colorbox{
    margin:5px;
    height:50px;
}

</style>
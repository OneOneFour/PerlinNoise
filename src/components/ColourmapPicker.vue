<template>
    <div class="colormap-picker" :style="{width:10 + canvasWidth+'px'}">
        <div class="blend-group">
            <div class="blend-title" :style="{width:canvasWidth + 'px'}">
                Blend - {{Math.round(colorstore.blend*100)}} %  
            </div>
            <input type=range min=0 max=1 step=0.05 :value="colorstore.blend" @change="$emit('repaint')" @input="setBlend" class="blend-range"/>
        </div>

        <div class="colorbox" ref="colorbox" @mousemove="updatePosition" @mouseenter="showHint=true" @mouseleave="showHint=false" @click="createStop" :class="{'can-place':validPosition}">
            <div class="stop-map" >
                <color-stop v-if="showHint && validPosition" :val="curMousePoint" :color="colorstore.map(curMousePoint)" ghost/>
                <color-stop v-for="(stop,i) in colorstore.stops" :val=stop.val :color=stop.color :key=stop.val @update-color="changeColor(i,$event)" @contextmenu.native="removeStop($event,i)" @disable-track="showHint=false"/>
            </div>
            <canvas ref=colorband class="colorband" :width="canvasWidth" :height="canvasHeight" />
        </div>        
    </div>    
</template>
<script>
import ColorStop from './ColorStop.vue';
import ColorStore from '@/js/ColorStore.js';
import { clamp } from '@/js/utils';
// import _ from 'lodash';
export default {
    components:{
        ColorStop
    },
    data:()=>({
        colorstore:ColorStore,
        canvasWidth:400,
        canvasHeight:40,
        ctx: null,
        curMousePoint:0,
        lastCreatePos:undefined,
        showHint:false
    }),
    mounted(){
        // this.canvasWidth = this.$refs.colorbox.getBoundingClientRect().width
        // this.canvasHeight = this.$refs.colorbox.getBoundingClientRect().height - 15;
        this.ctx = this.$refs.colorband.getContext('2d')
        this.repaint();
    },
    computed:{
        validPosition() {
            //Elements are 15px by default
            if(this.lastCreatePos == this.curMousePoint) return false;
            let sizeOfElem = 30/this.canvasWidth
            let val = true
            for(let i=0; i < ColorStore.stops.length; i++){
                val &= Math.abs(this.curMousePoint - ColorStore.stops[i].val) >= sizeOfElem
            }
            return val
        }
    },
    methods:{
        repaint(){
            requestAnimationFrame(this.repaint)
            this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
            for(let i=0; i <= this.canvasWidth; i++){
                let v = 2*i/this.canvasWidth - 1 // map [0 <> canvasWidth] -> [-1 <> 1]
                this.ctx.fillStyle=this.colorstore.map(v)
                this.ctx.fillRect(i,0,1,this.canvasHeight)
            }
        },
        setBlend({target}){
            ColorStore.setBlend(target.value)
            this.$forceUpdate();
        },
        changeColor(i,e){
            ColorStore.updateStopColor(i,e)
            this.$emit('repaint')
        },
        updatePosition({clientX}){
            let local_val = (clientX - this.$refs.colorbox.getBoundingClientRect().left)*2/this.$refs.colorbox.getBoundingClientRect().width - 1
            this.curMousePoint = clamp(local_val,-1,1)
        },
        createStop(){
            if(this.validPosition) {
                ColorStore.addStop(this.curMousePoint)
                this.lastCreatePos = this.curMousePoint
            }
        },
        removeStop(e,i){
            e.preventDefault();
            ColorStore.removeStop(i)
            this.$emit('repaint')
        }
    }
}
</script>
<style>
.stop-map{
    position:relative;
    height:15px;
}
.colorbox{
    margin:5px;
}
.colorbox.can-place{
    cursor:copy;
}
.blend-range{
    width:90%;
}
</style>
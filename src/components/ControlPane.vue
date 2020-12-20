<template>
    <div class="control_pane">
      <h3>Perlin Noise Generator</h3>
      <p class="control-text">Pixels per Corner: {{pixelPerCorner}}</p>
      <input type="range" min=30 max=200 step=5 v-model="pixelPerCorner" />
      <p class="control-text">Resolution: {{perlinResolution}}</p>
      <input type="range" min=1 max=50 step=1 v-model="perlinResolution" />
      <button @click="$emit('regenerate',{pixelPerCorner,perlinResolution})"> Regenerate </button>
      <button @click="$emit('toggle-detail')"> {{(showDetail)? 'Hide':'Show'}} detail </button>
    </div>
</template>
<script>
export default {
    data:()=>({
        pixelPerCorner:100,
        perlinResolution:10
    }),
    props:{
        showDetail:{type:Boolean}
    }
}
</script>
<style>
.control_pane{
  position: absolute;
  background:white;
  left:10px;
  top:10px;
  padding:10px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
}
.control_pane h3{
  margin:0;
}
.control-text{
  display:inline;
}
</style>
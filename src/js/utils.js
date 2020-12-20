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
export {valToColor,genRandomUnit,dotProduct,smootherstep};
  
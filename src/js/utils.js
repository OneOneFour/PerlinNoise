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
function clamp(val,min=Number.MIN_SAFE_INTEGER,max=Number.MAX_SAFE_INTEGER){
    return Math.min(Math.max(val,min),max)
}  

function valToColor(val){
    let clamp_val = clamp(val,-1,1)
    return `rgba(${Math.round(((clamp_val + 1)*255/2))},0,${Math.round((1 - clamp_val)*255/2)},255)`
}
function valToColorRGB(val){
    let clamp_val = clamp(val,-1,1)
    return {r:Math.round(((clamp_val + 1)*255/2)),b:Math.round((1 - clamp_val)*255/2)}
}
export {valToColor,valToColorRGB,genRandomUnit,dotProduct,smootherstep,clamp};
  
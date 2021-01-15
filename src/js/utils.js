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

function blend(x,a){
    return (1-Math.exp(-x/a))*(1+ Math.exp(-0.5/a))/((1 - Math.exp(-1/a))*(1+ Math.exp(-(x-0.5)/a)))
}

function hextorgb(hex){
    if (hex.length == 7) return {r:parseInt(hex[1]+hex[2],16),g:parseInt(hex[3]+hex[4],16),b:parseInt(hex[5] +hex[6],16)}
    else if(hex.length === 4) return {r:parseInt(hex[1]+hex[1],16),g:parseInt(hex[2] +hex[2],16),b:parseInt(hex[3] + hex[3],16)}
    else throw new Error("Not a valid hex code");
}
function rgbtohex(r,g,b){
    return `#${Math.round(r).toString(16).padStart(2,"0")}${Math.round(g).toString(16).padStart(2,"0")}${Math.round(b).toString(16).padStart(2,"0")}`
}

function generateColormap(stops,blendAmount){  
    // Steps: [Array ] of Objects containg points
    stops.sort( (a,b) => a.val - b.val) 
    return function(v){
        // v: Value will be clamped between -1, 1
        let clamp_v = clamp(v,-1,1)
        for(let i =0; i <stops.length -1; i++){
            if(stops[i].val < clamp_v && clamp_v <= stops[i+1].val){//inside region of interest
                let local_v = (clamp_v - stops[i].val) / (stops[i+1].val - stops[i].val)
                let {r:r_0,g:g_0,b:b_0} = hextorgb(stops[i].color)
                let {r:r_1,g:g_1,b:b_1} = hextorgb(stops[i+1].color)
                let mixAmount = blend(local_v,blendAmount*blendAmount)
                return rgbtohex(r_0 + mixAmount*(r_1 - r_0),g_0 + mixAmount*(g_1 - g_0), b_0 + mixAmount*(b_1 - b_0))
            } 
        }
        return stops[0].color
    }
}

function valToColor(val){
    let clamp_val = clamp(val,-1,1)
    return `rgba(${Math.round(((clamp_val + 1)*255/2))},0,${Math.round((1 - clamp_val)*255/2)},255)`
}
function valToColorRGB(val){
    let clamp_val = clamp(val,-1,1)
    return {r:Math.round(((clamp_val + 1)*255/2)),b:Math.round((1 - clamp_val)*255/2)}
}
function islight(hex){
    let {r,g,b} = hextorgb(hex)
    return (r + g + b)/3 >= 127.5
}

export {valToColor,valToColorRGB,genRandomUnit,dotProduct,smootherstep,clamp,hextorgb,rgbtohex,generateColormap,islight};
  
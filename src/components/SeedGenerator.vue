<template>
    <div class="seed-generator">
        <span>Seed: </span>
        <input :value="value" @input="updateInput"/>
        <button class="button random" @click="generateRandomWord"><font-awesome-icon icon="dice"/></button>
    </div>
</template>
<script>
import randomWord from 'random-words';
export default {
    data:()=>({
        value:null
    }),
    mounted(){
        this.generateRandomWord();
    },
    methods:{
        generateRandomWord(){
            this.value = randomWord({exactly:1,wordsPerString:2})[0]
            this.$emit('input',this.value)
        },
        updateInput(e){
            this.value = e.target.value
            this.$emit('input',this.value)
        }
    },

}
</script>
<style>
.seed-generator{
    color:white;
}
.button.random{
    margin: 0 0.5rem;
    background-color: #e67e22;
}
.button.random:hover{
    background-color:#d35400;
}
</style>
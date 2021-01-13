import Vue from 'vue'
import App from './App.vue'
import '@/assets/global.css';
import ColorStore from '@/js/ColorStore.js';
Vue.config.productionTip = false

// Click-outside directive 
Vue.directive('click-outside', {
  bind(el,binding,vnode){
    el.clickOutside = function(e) {
      if(!(e.target === el || el.contains(e.target))) vnode.context[binding.expression](e)
    }
    document.body.addEventListener('click', el.clickOutside)
  },
  unbind(el){
    document.body.removeEventListener('click',el.clickOutside)
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
window.ColorStore = ColorStore
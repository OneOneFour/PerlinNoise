import Vue from 'vue'
import App from './App.vue'
import '@/assets/global.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faRedo,faPalette,faTimesCircle,faCogs,faDice,faDownload,faInfo} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

// Configure Library + add global component
library.add(faRedo);
library.add(faPalette);
library.add(faTimesCircle);
library.add(faCogs);
library.add(faDice);
library.add(faDownload);
library.add(faInfo);
Vue.component('font-awesome-icon',FontAwesomeIcon);

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
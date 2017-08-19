import Vue from 'vue'
import App from './App.vue'

Vue.filter('round', input => Number(input).toFixed(2))
var vm = new Vue({
  el: '#app',
  render: h => h(App)
})

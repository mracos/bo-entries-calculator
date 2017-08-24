import Vue from 'vue'
import App from './App.vue'

Vue.filter('round', input => Number(Number(input).toFixed(2)))
Vue.filter('plusOne', number => number + 1)
var vm = new Vue({
  el: '#app',
  render: h => h(App)
})

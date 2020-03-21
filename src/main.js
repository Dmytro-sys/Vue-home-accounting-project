import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import firebase from 'firebase/app'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import 'materialize-css'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyBxSKe6r5vSWOXxPOs6PYu4kjqqEnPExls",
  authDomain: "my-vuecrm1.firebaseapp.com",
  databaseURL: "https://my-vuecrm1.firebaseio.com",
  projectId: "my-vuecrm1",
  storageBucket: "my-vuecrm1.appspot.com",
  messagingSenderId: "1028039408880",
  appId: "1:1028039408880:web:07b73bb3fc5fb067d51635",
  measurementId: "G-JQ6V96GTKS"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})



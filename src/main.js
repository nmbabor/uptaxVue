// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//const apiUrl = 'https://api.dharmapur.uptaxbd.com/'
const apiUrl = 'https://api.uptaxbd.com/'
//const apiUrl = 'https://api.uptax.paperless.academy/'
//const apiUrl = 'http://localhost:8000/'
import Vue from 'vue'
import App from './App'
import router from './router'
import Main from './components/layouts/MainLayouts.vue'
import Login from './components/layouts/LoginLayouts.vue'
import VeeValidate from 'vee-validate';
import VueSweetalert2 from 'vue-sweetalert2';
import Datepicker from 'vuejs-datepicker';
import 'vue-select/dist/vue-select.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Print from 'vue-print-nb'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Print);
Vue.use(Vuetify)
Vue.use(VueSweetalert2)
Vue.use(VeeValidate);
Vue.component('vuejs-datepicker', Datepicker)
Vue.component('main-layout', Main)
Vue.component('login-layout', Login)
Vue.use(require('vue-script2'))
Vue.component('pagination', require('laravel-vue-pagination'));
Vue.config.productionTip = false
localStorage.setItem('apiUrl', apiUrl)
Vue.prototype.$baseUrl = apiUrl
Vue.prototype.$union_id = ''
if (localStorage.getItem("union_id") !== null) {
    Vue.prototype.$union_id = localStorage.getItem("union_id")
}
if (localStorage.getItem("union_name") !== null) {
    Vue.prototype.$union_name = localStorage.getItem("union_name")
}
if (localStorage.getItem("id") !== null) {
    Vue.prototype.$user_id = localStorage.getItem("id")
}
if (localStorage.getItem("year") !== null) {
    Vue.prototype.$year = localStorage.getItem("year")
}
if (localStorage.getItem("type") !== null) {
    Vue.prototype.$type = localStorage.getItem("type")
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
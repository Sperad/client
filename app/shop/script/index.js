import Register from './components/register.vue';

var App = Vue.extend({})
var router = new VueRouter()

router.map({
    '/': {
        component: Register
    }
})
router.start(App, '#app')

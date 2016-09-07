// import Register from './components/register.vue';

var App = Vue.extend({})
var router = new VueRouter()

router.map({
    '/': {
        component: function(){
            return "aaaa";
        }
    }
})
router.start(App, '#app')
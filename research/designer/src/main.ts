import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import framework from '@/framework/framework';

Vue.config.productionTip = false;

Vue.use(framework);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

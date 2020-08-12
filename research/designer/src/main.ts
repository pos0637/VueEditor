import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import framework from '@/framework/framework';
import { Button } from 'ant-design-vue';

Vue.config.productionTip = false;

Vue.use(framework);
Vue.component(Button.name, Button);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

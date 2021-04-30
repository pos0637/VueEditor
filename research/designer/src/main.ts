import Vue from 'vue';
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';
import store from './store';
import framework from '@/framework/framework';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(framework);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $framework: Framework;
    }
}

/**
 * 框架
 *
 * @class Framework
 */
class Framework {
    foo() {
        console.debug('foo');
    }

    /**
     * 创建组件
     *
     * @param {string} path 路径
     * @param {(object | null)} [propsData=null] 参数
     * @return {*}  {Promise<Vue>} 组件
     * @memberof Framework
     */
    async generateComponent(
        path: string,
        propsData: object | null = null
    ): Promise<Vue> {
        const loader = import(`@/${path.substring(2, path.length - 4)}.vue`);
        const clazz = Vue.extend((await loader).default);
        let options = {};
        if (typeof propsData !== 'undefined' && propsData !== null) {
            options = { ...options, propsData: propsData };
        }

        return new clazz(options);
    }
}

const framework = {
    install: function(vue: typeof Vue): void {
        vue.prototype.$framework = new Framework();
    }
};

export default framework;

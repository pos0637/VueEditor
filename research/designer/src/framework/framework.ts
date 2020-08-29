import Vue from 'vue';
import BaseComponent from '@/framework/baseComponent';
import { Constructor } from 'vue/types/options';

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
    /**
     * 焦点组件
     *
     * @type {(BaseComponent | null)}
     * @memberof Framework
     */
    public focusComponent: BaseComponent | null = null;

    public foo() {
        console.debug('foo');
    }

    /**
     * 创建组件类型
     *
     * @param {string} path 路径
     * @return {*}  {Constructor} 组件类型
     * @memberof Framework
     */
    public async generateComponentClass(path: string): Promise<Constructor> {
        const loader = import(`@/${path.substring(2, path.length - 4)}.vue`);
        return Vue.extend((await loader).default);
    }

    /**
     * 创建组件
     *
     * @param {string} path 路径
     * @param {(object | null)} [propsData=null] 参数
     * @return {*}  {Promise<Vue>} 组件
     * @memberof Framework
     */
    public async generateComponent(path: string, propsData: object | null = null): Promise<Vue> {
        const clazz = await this.generateComponentClass(path);
        let options = {};
        if (typeof propsData !== 'undefined' && propsData !== null) {
            options = { ...options, propsData: propsData };
        }

        return new clazz(options);
    }

    /**
     * 添加组件
     *
     * @param {string} path 路径
     * @return {*} {Promise<void>}
     * @memberof Framework
     */
    public async attachComponent(path: string): Promise<void> {
        if (this.focusComponent === null) {
            return;
        }

        const clazz = await this.generateComponentClass(path);
        this.focusComponent.attachComponent(clazz);
    }
}

const framework = {
    install: function(vue: typeof Vue): void {
        vue.prototype.$framework = new Framework();
    }
};

export default framework;

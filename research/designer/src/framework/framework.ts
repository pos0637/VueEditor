import Vue from 'vue';
import BaseComponent, { DragData } from '@/framework/baseComponent';

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
     * 创建组件
     *
     * @param {string} path 路径
     * @param {(object | null)} [propsData=null] 参数
     * @return {*}  {Promise<Vue>} 组件
     * @memberof Framework
     */
    public async generateComponent(
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

    /**
     * 添加组件
     *
     * @param {DragData} data 拖拽数据
     * @return {*} {Promise<void>}
     * @memberof Framework
     */
    public async attachComponent(data: DragData): Promise<void> {
        if (this.focusComponent === null) {
            return;
        }

        const component = await this.generateComponent(data.component);
        this.focusComponent.attachComponent(component);
    }
}

const framework = {
    install: function(vue: typeof Vue): void {
        vue.prototype.$framework = new Framework();
    }
};

export default framework;

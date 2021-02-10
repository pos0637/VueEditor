import Vue from 'vue';
import { Constructor } from 'vue/types/options';
import DraggableComponent from '@/framework/draggableComponent';

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
     * 拖拽组件
     *
     * @type {(DraggableComponent | null)}
     * @memberof Framework
     */
    public dragComponent: DraggableComponent | null = null;

    public foo() {
        console.debug('foo');
    }

    /**
     * 创建组件类型
     *
     * @param {string} path 路径
     * @return {*} {Constructor} 组件类型
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
     * @return {*} {Promise<Constructor>} 组件类型
     * @memberof Framework
     */
    public async generateDragComponent(): Promise<Constructor> {
        if (this.dragComponent === null) {
            throw new Error();
        }

        return await this.generateComponentClass(this.dragComponent.path);
    }

    /**
     * 获取样式字符串
     *
     * @param {object} data 样式
     * @return {*} {String} 样式字符串
     * @memberof Framework
     */
    public getStyles(styles: object): string {
        return JSON.stringify(styles)
            .replace(/"|{|}/g, '')
            .replace(/,/g, ';');
    }
}

const framework = {
    install: function(vue: typeof Vue): void {
        vue.prototype.$framework = new Framework();
    }
};

export default framework;

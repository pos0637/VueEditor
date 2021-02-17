import Vue from 'vue';
import { Constructor } from 'vue/types/options';
import _ from 'lodash';
import DraggableComponent from '@/framework/draggableComponent';

declare module 'vue/types/vue' {
    interface Vue {
        $framework: Framework;
    }
}

/**
 * 属性元数据
 *
 * @export
 * @interface PropertyMetaData
 */
export interface PropertyMetaData {
    /**
     * 标题
     *
     * @type {string}
     * @memberof PropertyMetaData
     */
    title?: string;

    /**
     * 类型
     *
     * @type {string}
     * @memberof PropertyMetaData
     */
    type?: string;

    /**
     * 值
     *
     * @type {*}
     * @memberof PropertyMetaData
     */
    value?: any;
}

/**
 * 属性注解
 *
 * @export
 * @param {(PropertyMetaData | null | undefined)} [metaData=null] 属性元数据
 * @return {*} {Function} 函数
 */
export function Property(metaData: PropertyMetaData | null | undefined = null): Function {
    // eslint-disable-next-line
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.constructor.metaData = {
            [propertyKey]: metaData || {},
            ...target.constructor.metaData
        };
    };
}

/**
 * 获取属性元数据
 *
 * @param {*} module 组件
 * @return {*} {{ [index: string]: PropertyMetaData }} 属性元数据
 */
export function getPropertyMetaData(module: any): { [index: string]: PropertyMetaData } {
    let metaData: { [index: string]: PropertyMetaData } = {};
    if (typeof module['super'] !== 'undefined') {
        metaData = getPropertyMetaData(module['super']);
    }

    return {
        ...metaData,
        ...module.metaData
    };
}

/**
 * 设置属性元数据值
 *
 * @export
 * @param {{ [index: string]: PropertyMetaData }} metaData 属性元数据
 * @param {{ [index: string]: any }} props 参数
 * @return {*} {{ [index: string]: PropertyMetaData }} 属性元数据
 */
export function setPropertyMetaData(metaData: { [index: string]: PropertyMetaData }, props: { [index: string]: any }): { [index: string]: PropertyMetaData } {
    for (const key in props) {
        if (typeof metaData[key] !== 'undefined') {
            metaData[key].value = props[key];
        }
    }

    return metaData;
}

/**
 * 获取参数
 *
 * @export
 * @param {{ [index: string]: PropertyMetaData }} metaData 属性元数据
 * @return {*} {{ [index: string]: any }} 参数
 */
export function getProperties(metaData: { [index: string]: PropertyMetaData }): { [index: string]: any } {
    const result: { [index: string]: any } = {};
    for (const key in metaData) {
        result[key] = metaData[key].value;
    }

    return result;
}

/**
 * 框架
 *
 * @class Framework
 */
class Framework {
    /**
     * 编辑模式
     *
     * @type {boolean}
     * @memberof Framework
     */
    public editorMode = true;

    /**
     * 拖拽组件
     *
     * @type {(DraggableComponent | null)}
     * @memberof Framework
     */
    public dragComponent: DraggableComponent | null = null;

    /**
     * 焦点组件
     *
     * @type {(DraggableComponent | null)}
     * @memberof Framework
     */
    public focusComponent: DraggableComponent | null = null;

    public foo() {
        console.debug('foo');
    }

    /**
     * 创建组件类型
     *
     * @param {string} path 路径
     * @return {*} {Promise<[Constructor, { [index: string]: PropertyMetaData }]>} 组件类型, 属性元数据
     * @memberof Framework
     */
    public async generateComponentClass(path: string): Promise<[Constructor, { [index: string]: PropertyMetaData }]> {
        const loader = import(`@/${path.substring(2, path.length - 4)}.vue`);
        const module = await loader;
        const metaData = _.cloneDeep(getPropertyMetaData(module.default));
        return [Vue.extend(module.default), metaData];
    }

    /**
     * 创建组件
     *
     * @param {string} path 路径
     * @param {(object | null)} [propsData=null] 参数
     * @return {*} {Promise<[Vue, { [index: string]: PropertyMetaData }]>} 组件, 属性元数据
     * @memberof Framework
     */
    public async generateComponent(path: string, propsData: object | null = null): Promise<[Vue, { [index: string]: PropertyMetaData }]> {
        const [clazz, metaData] = await this.generateComponentClass(path);
        let options = {};
        if (typeof propsData !== 'undefined' && propsData !== null) {
            options = { ...options, propsData: propsData };
        }

        return [new clazz(options), metaData];
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

    /**
     * 设置焦点组件
     *
     * @param {(DraggableComponent | null)} focusComponent 焦点组件
     * @memberof Framework
     */
    public setFocusComponent(focusComponent: DraggableComponent | null): void {
        if (this.focusComponent !== null) {
            this.focusComponent.setBorderHighlight(false);
        }

        this.focusComponent = focusComponent;
        if (this.focusComponent !== null) {
            this.focusComponent.setBorderHighlight(true);
        }
    }
}

const framework = {
    install: function(vue: typeof Vue): void {
        vue.prototype.$framework = new Framework();
    }
};

export default framework;

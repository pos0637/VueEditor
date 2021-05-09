import Vue from 'vue';
import { Constructor } from 'vue/types/options';
import { Component, Prop } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';
import { Property, PropertyMetaData, setPropertyMetaData, getProperties } from '@/framework/framework';

/**
 * 组件元数据
 *
 * @export
 * @interface MetaData
 */
export interface MetaData {
    /**
     * 名称
     *
     * @type {string}
     * @memberof MetaData
     */
    name: string;

    /**
     * 组件类型
     *
     * @type {Constructor | undefined | null}
     * @memberof MetaData
     */
    clazz: Constructor | undefined | null;

    /**
     * 参数
     *
     * @type {{[index: string]:any}}
     * @memberof MetaData
     */
    props: { [index: string]: any };

    /**
     * 子组件列表
     *
     * @type {Array<Meta>}
     * @memberof MetaData
     */
    children: Array<MetaData>;

    /**
     * 组件引用
     *
     * @type {*}
     * @memberof MetaData
     */
    ref?: any;
}

/**
 * 基础组件
 *
 * @export
 * @class BaseComponent
 * @extends {Vue}
 */
@Component
export default class BaseComponent extends Vue {
    /**
     * 组件元数据
     *
     * @type {(object)}
     * @memberof BaseComponent
     */
    @Prop({ default: () => ({ text: '', clazz: null, props: {}, children: [] }) })
    public metaData!: MetaData;

    /**
     * 横坐标
     *
     * @type {(number | undefined)}
     * @memberof BaseComponent
     */

    @Prop()
    @Property({ title: '横坐标' })
    public left?: number | undefined;

    /**
     * 纵坐标
     *
     * @type {(number | undefined)}
     * @memberof BaseComponent
     */

    @Prop()
    @Property({ title: '纵坐标' })
    public top?: number | undefined;

    /**
     * 是否为容器组件
     *
     * @protected
     * @memberof BaseComponent
     */
    @Property({ title: '是否为容器组件', visiable: false, value: false })
    protected isContainer = false;

    /**
     * 原始风格
     */
    private originalStyle: any = null;

    /**
     * 设置背景高亮
     *
     * @param {boolean} highlight 是否高亮
     * @memberof BaseComponent
     */
    public setBackgroundHighlight(highlight: boolean): void {
        if (highlight && this.originalStyle === null) {
            this.originalStyle = $(this.$el).css(['background-color', 'border']);
            $(this.$el).css({ 'background-color': '#C1E0FF' });
        } else if (!highlight && this.originalStyle !== null) {
            $(this.$el).css(this.originalStyle);
            this.originalStyle = null;
        }
    }

    /**
     * 设置边框高亮
     *
     * @param {boolean} highlight 是否高亮
     * @memberof BaseComponent
     */
    public setBorderHighlight(highlight: boolean): void {
        if (highlight && this.originalStyle === null) {
            this.originalStyle = $(this.$el).css(['background-color', 'border']);
            $(this.$el).css({ border: '1px dotted gray' });
        } else if (!highlight && this.originalStyle !== null) {
            $(this.$el).css(this.originalStyle);
            this.originalStyle = null;
        }
    }

    /**
     * 组件是否处于设计器内
     *
     * @return {*} {boolean} 组件是否处于设计器内
     * @memberof BaseComponent
     */
    public inDesigner(): boolean {
        return this.metaData.clazz !== null;
    }

    /**
     * 组件创建完成事件处理函数
     *
     * @protected
     * @memberof BaseComponent
     */
    protected created(): void {
        this.metaData.ref = this;

        // 创建组件后将属性值赋值为当前值以便处理属性默认值
        this.syncPropertiesValue();
    }

    protected mounted(): void {
        // 同步子组件以便支持容器组件硬编码
        this.syncChildren();
    }

    /**
     * 获取容器名称
     *
     * @protected
     * @return {*} {string} 容器名称
     * @memberof BaseComponent
     */
    protected getContainer(): string {
        return '';
    }

    /**
     * 添加组件
     *
     * @protected
     * @param {string} componentPath 组件类型
     * @param {({ [index: string]: any } | undefined)} [props] 组件参数
     * @return {*} {Promise<void>}
     * @memberof BaseComponent
     */
    protected async attachComponent(componentPath: string, props?: { [index: string]: any } | undefined): Promise<void> {
        const [clazz, metaData] = await this.$framework.generateComponentClass(componentPath);
        const className = componentPath.substring(componentPath.lastIndexOf('/') + 1, componentPath.length - 4);
        this.metaData.children.push({
            name: `${className}-${uuidv4()}`,
            clazz: clazz,
            props: setPropertyMetaData(metaData, props || {}),
            children: []
        });

        this.$store.commit('updateHierarchy');
    }

    /**
     * 是否包含组件
     *
     * @protected
     * @param {Vue} component 组件
     * @return {*} {boolean} 是否包含组件
     * @memberof BaseComponent
     */
    protected containsComponent(component: Vue | null): boolean {
        return this.getComponentId(component) >= 0;
    }

    /**
     * 获取组件索引
     *
     * @protected
     * @param {(Vue | null)} component 组件
     * @return {*} {number} 索引
     * @memberof BaseComponent
     */

    protected getComponentId(component: Vue | null): number {
        return component === null ? -1 : this.$children.indexOf(component);
    }

    /**
     * 容器风格
     *
     * @readonly
     * @protected
     * @type {object} 容器风格
     * @memberof BaseComponent
     */
    protected get containerStyles(): object {
        const styles = {
            left: `${this.left}px`,
            top: `${this.top}px`
        };

        if (typeof this.$parent !== 'undefined' && this.$parent !== null) {
            return (this.$parent as BaseComponent).getChildContainerStyles(styles);
        } else {
            return styles;
        }
    }

    /**
     * 获取子组件容器风格
     *
     * @protected
     * @param {object} styles 子组件容器风格
     * @return {*} {object} 处理后子组件容器风格
     * @memberof BaseComponent
     */
    protected getChildContainerStyles(styles: object): object {
        return styles;
    }

    /**
     * 获取参数
     *
     * @protected
     * @param {{ [index: string]: PropertyMetaData }} metaData 属性元数据
     * @return {*}  {{ [index: string]: any }} 参数
     * @memberof BaseComponent
     */
    protected getProperties(metaData: { [index: string]: PropertyMetaData }): { [index: string]: any } {
        return getProperties(metaData);
    }

    /**
     * 同步属性值
     *
     * @private
     * @memberof BaseComponent
     */
    private syncPropertiesValue(): void {
        for (const key in this.metaData.props) {
            const prop = this.metaData.props[key];
            if (!prop.visiable) {
                continue;
            }

            prop.value = this[key];
        }
    }

    /**
     * 同步子组件
     *
     * @private
     * @memberof BaseComponent
     */
    private syncChildren(): void {
        for (const child of this.$children) {
            if (child instanceof BaseComponent) {
                const metaData = {
                    name: `${child.constructor.name}-${uuidv4()}`,
                    clazz: null,
                    props: this.$framework.getComponentMetaData(child),
                    children: []
                };

                this.metaData.children.push(metaData);
                child.$set(child, 'metaData', metaData);
            }
        }
    }
}

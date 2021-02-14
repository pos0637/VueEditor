import { Constructor } from 'vue/types/options';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';

/**
 * 组件元数据
 *
 * @export
 * @interface Meta
 */
export interface Meta {
    /**
     * 名称
     *
     * @type {string}
     * @memberof Meta
     */
    name: string;

    /**
     * 组件类型
     *
     * @type {Constructor}
     * @memberof Meta
     */
    clazz: Constructor;

    /**
     * 参数
     *
     * @type {object}
     * @memberof Meta
     */
    props: object;

    /**
     * 子组件列表
     *
     * @type {Array<Meta>}
     * @memberof Meta
     */
    children: Array<Meta>;
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
    @Prop({ default: () => ({ text: '', clazz: null, props: {}, children: [] }) }) public meta!: Meta;

    /**
     * 位置类型
     *
     * @type {(string | undefined)}
     * @memberof BaseComponent
     */
    @Prop() public position?: string | undefined;

    /**
     * 横坐标
     *
     * @type {(number | undefined)}
     * @memberof BaseComponent
     */
    @Prop() public left?: number | undefined;

    /**
     * 纵坐标
     *
     * @type {(number | undefined)}
     * @memberof BaseComponent
     */
    @Prop() public top?: number | undefined;

    /**
     * 原始风格
     */
    // eslint-disable-next-line
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
     * @param {*} componentPath 组件类型
     * @param {*} props 组件参数
     * @memberof BaseComponent
     */
    protected async attachComponent(componentPath: string, props?: object | undefined): Promise<void> {
        const clazz = await this.$framework.generateComponentClass(componentPath);
        const className = componentPath.substring(componentPath.lastIndexOf('/') + 1, componentPath.length - 4);
        this.meta.children.push({
            name: `${className}-${uuidv4()}`,
            clazz: clazz,
            props: props || {},
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
        if (typeof this.position !== 'undefined') {
            return {
                position: this.position,
                left: `${this.left}px`,
                top: `${this.top}px`
            };
        } else {
            return {};
        }
    }
}

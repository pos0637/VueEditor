import { Constructor } from 'vue/types/options';
import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';

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
     * 子组件列表
     */
    protected children: Array<Constructor> = [];

    /**
     * 子组件参数列表
     */
    protected childrenProps: Array<object> = [];

    /**
     * 原始风格
     */
    // eslint-disable-next-line
    private originalStyle: any = null;

    /**
     * 添加组件
     *
     * @protected
     * @param {*} clazz 组件类型
     * @param {*} props 组件参数
     * @memberof BaseComponent
     */
    protected attachComponent(clazz: Constructor, props?: object | undefined): void {
        this.children.push(clazz);
        this.childrenProps.push(props || {});
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
     * 设置背景高亮
     *
     * @param {boolean} highlight 是否高亮
     * @memberof BaseComponent
     */
    protected setBackgroundHighlight(highlight: boolean): void {
        if (highlight && this.originalStyle === null) {
            this.originalStyle = $(this.$el).css(['background-color']);
            $(this.$el).css({ 'background-color': '#C1E0FF' });
        } else if (!highlight && this.originalStyle !== null) {
            $(this.$el).css(this.originalStyle);
            this.originalStyle = null;
        }
    }
}

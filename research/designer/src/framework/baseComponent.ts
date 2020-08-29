import { Constructor } from 'vue/types/options';
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';

@Component
export default class BaseComponent extends Vue {
    /**
     * 子组件列表
     */
    children: Array<Constructor> = [];

    /**
     * 原始风格
     */
    // eslint-disable-next-line
    originalStyle: any = null;

    mounted() {
        if (typeof this.$el !== 'undefined' && this.$el !== null) {
            // eslint-disable-next-line
            $(this.$el).mouseenter((e: any): void => this._onMouseEnter(e));
            // eslint-disable-next-line
            $(this.$el).mouseleave((e: any): void => this._onMouseLeave(e));
            // eslint-disable-next-line
            $(this.$el).mousemove((e: any): void => this._onMouseMove(e));
        }
    }

    /**
     * 添加组件
     *
     * @protected
     * @param {*} clazz 组件类型
     * @memberof BaseComponent
     */
    public attachComponent(clazz: Constructor): void {
        this.children.push(clazz);
    }

    /**
     * 设置背景高亮
     *
     * @param {boolean} highlight 是否高亮
     * @memberof BaseComponent
     */
    public setBackgroundHighlight(highlight: boolean): void {
        if (highlight && this.originalStyle === null) {
            this.originalStyle = $(this.$el).css(['background-color']);
            $(this.$el).css({ 'background-color': '#C1E0FF' });
        } else if (!highlight && this.originalStyle !== null) {
            $(this.$el).css(this.originalStyle);
            this.originalStyle = null;
        }
    }

    /**
     * 鼠标进入事件处理函数
     *
     * @private
     * @param {MouseEvent} e 鼠标事件
     * @memberof BaseComponent
     */
    private _onMouseEnter(e: MouseEvent): void {
        console.debug('_onMouseEnter');
        if (this.$framework.focusComponent !== this) {
            this.$framework.focusComponent?.setBackgroundHighlight(false);
        }

        this.$framework.focusComponent = this;
        this.setBackgroundHighlight(true);
        e.stopPropagation();
    }

    /**
     * 鼠标离开事件处理函数
     *
     * @private
     * @param {MouseEvent} e 鼠标事件
     * @memberof BaseComponent
     */
    private _onMouseLeave(e: MouseEvent): void {
        console.debug('_onMouseLeave');
        this.setBackgroundHighlight(false);
        if (this.$framework.focusComponent === this) {
            this.$framework.focusComponent = null;
        }

        e.stopPropagation();
    }

    /**
     * 鼠标移动事件处理函数
     *
     * @private
     * @param {MouseEvent} e 鼠标事件
     * @memberof BaseComponent
     */
    private _onMouseMove(e: MouseEvent): void {
        if (this.$framework.focusComponent !== this) {
            this.$framework.focusComponent?.setBackgroundHighlight(false);
        }

        this.$framework.focusComponent = this;
        this.setBackgroundHighlight(true);
        e.stopPropagation();
    }
}

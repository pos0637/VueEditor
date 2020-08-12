import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';

@Component
export default class BaseComponent extends Vue {
    /**
     * 子组件列表
     */
    children: Array<Vue> = [];

    /**
     * 原始风格
     */
    originalStyle: any = null;

    mounted() {
        if (typeof this.$el !== 'undefined' && this.$el !== null) {
            $(this.$el).mouseenter((e: any): void => this._onMouseEnter(e));
            $(this.$el).mouseleave((e: any): void => this._onMouseLeave(e));
        }
    }

    /**
     * 添加组件
     *
     * @protected
     * @param {*} component 组件
     * @memberof BaseComponent
     */
    protected _attachComponent(component: Vue): void {
        this.children.push(component);
    }

    /**
     * 删除临时组件
     *
     * @protected
     * @param {*} component 组件
     * @memberof BaseComponent
     */
    protected _detachComponent(component: Vue): void {
        this.children.splice($.inArray(component, this.children), 1);
    }

    /**
     * 鼠标进入事件处理函数
     *
     * @private
     * @param {MouseEvent} e 鼠标事件
     * @memberof BaseComponent
     */
    private _onMouseEnter(e: MouseEvent): void {
        console.debug('mouseenter');
        this.originalStyle = $(this.$el).css(['background-color']);
        $(this.$el).css({'background-color': '#C1E0FF'});
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
        console.debug('mouseleave');
        $(this.$el).css(this.originalStyle);
        e.stopPropagation();
    }
}

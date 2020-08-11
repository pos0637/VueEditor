import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';

@Component
export default class BaseComponent extends Vue {
    /**
     * 临时组件
     */
    tempComponent = null;

    mounted() {
        if (typeof this.$el !== 'undefined' && this.$el !== null) {
            $(this.$el).mouseenter((e: any): void => this._onMouseEnter(e));
            $(this.$el).mouseleave((e: any): void => this._onMouseLeave(e));
        }
    }

    /**
     * 添加临时组件
     *
     * @protected
     * @param {*} component 组件
     * @memberof BaseComponent
     */
    protected _attachTempComponent(component: any): void {
        this.tempComponent = component;
    }

    /**
     * 删除临时组件
     *
     * @protected
     * @memberof BaseComponent
     */
    protected _detachTempComponent(): void {
        this.tempComponent = null;
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
        e.stopPropagation();
    }
}

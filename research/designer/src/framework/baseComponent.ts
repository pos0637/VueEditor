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
}

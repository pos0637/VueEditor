import { Component, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';
import BaseComponent from '@/framework/baseComponent';

/**
 * 可拖拽组件
 */
@Component
export default class DraggableComponent extends BaseComponent {
    /**
     * 名称
     */
    @Prop() public name!: string;

    /**
     * 路径
     */
    @Prop() public path!: string;

    mounted() {
        $(this.$refs[this.getContainer()]).draggable({
            cursor: 'move',
            helper: 'clone',
            start: () => (this.$framework.dragComponent = this),
            stop: () => (this.$framework.dragComponent = null)
        });
    }
}

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
     * 标题
     */
    @Prop() public title!: string;

    /**
     * 路径
     */
    @Prop() public path!: string;

    protected mounted() {
        if (this.$framework.editorMode) {
            $(this.$refs[this.getContainer()]).draggable({
                cursor: 'move',
                helper: 'clone',
                start: () => (this.$framework.dragComponent = this),
                stop: () => (this.$framework.dragComponent = null)
            });

            $(this.$refs[this.getContainer()]).on('mousedown', event => {
                if (this.inDesigner()) {
                    this.$framework.setFocusComponent(this);
                    this.$store.commit('setFocusComponent', this);
                }
                event.stopPropagation();
            });
        }
    }
}

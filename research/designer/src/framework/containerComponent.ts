import { Constructor } from 'vue/types/options';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';
import BaseComponent from '@/framework/baseComponent';

@Component
export default class ContainerComponent extends BaseComponent {
    mounted() {
        $(this.$refs.container).droppable({
            over: () => this.setBackgroundHighlight(true),
            out: () => this.setBackgroundHighlight(false),
            drop: async (event, ui) => {
                this.setBackgroundHighlight(false);
                const constructor = await this.$framework.generateDragComponent();
                this.onDropComponent(constructor, event, ui);
            }
        });
    }

    /**
     * 放置组件事件处理函数
     *
     * @protected
     * @param {Constructor} constructor 组件类型
     * @param {JQueryEventObject} event 事件
     * @param {JQueryUI.DroppableEventUIParam} ui 参数
     * @memberof ContainerComponent
     */
    // eslint-disable-next-line
    protected onDropComponent(constructor: Constructor, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam) {
        this.attachComponent(constructor);
    }
}

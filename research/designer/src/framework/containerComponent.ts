import { Constructor } from 'vue/types/options';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';
import DraggableComponent from '@/framework/draggableComponent';

/**
 * 容器组件
 *
 * @export
 * @class ContainerComponent
 * @extends {DraggableComponent}
 */
@Component
export default class ContainerComponent extends DraggableComponent {
    mounted() {
        if (this.$framework.editorMode) {
            $(this.$refs[this.getContainer()]).droppable({
                greedy: true,
                over: () => this.setBackgroundHighlight(true),
                out: () => this.setBackgroundHighlight(false),
                drop: async (event, ui) => {
                    this.setBackgroundHighlight(false);
                    if (this.containsComponent(this.$framework.dragComponent)) {
                        this.onMoveComponent(this.$framework.dragComponent, event, ui);
                    } else {
                        const constructor = await this.$framework.generateDragComponent();
                        this.onDropComponent(constructor, event, ui);
                    }
                }
            });
        }
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
    protected onDropComponent(constructor: Constructor, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): void {
        this.attachComponent(constructor);
    }

    /**
     * 移动组件事件处理函数
     *
     * @protected
     * @param {DraggableComponent | null} component 组件
     * @param {JQueryEventObject} event 事件
     * @param {JQueryUI.DroppableEventUIParam} ui 参数
     * @memberof ContainerComponent
     */
    // eslint-disable-next-line
    protected onMoveComponent(component: DraggableComponent | null, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): void {}
}

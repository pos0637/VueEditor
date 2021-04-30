import { Component } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';
import { Property } from '@/framework/framework';
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
    /**
     * 是否为容器组件
     *
     * @protected
     * @memberof ContainerComponent
     */
    @Property({ title: '是否为容器组件', visiable: false, value: true })
    protected isContainer = true;

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
                        this.$framework.setFocusComponent(this.$framework.dragComponent);
                        this.$store.commit('setFocusComponent', this.$framework.dragComponent);
                    } else if (this.$framework.dragComponent !== null) {
                        this.onDropComponent(this.$framework.dragComponent.path, event, ui);
                    }
                }
            });
        }
    }

    /**
     * 放置组件事件处理函数
     *
     * @protected
     * @param {string} componentPath 组件类型
     * @param {JQueryEventObject} event 事件
     * @param {JQueryUI.DroppableEventUIParam} ui 参数
     * @memberof ContainerComponent
     */
    // eslint-disable-next-line
    protected async onDropComponent(componentPath: string, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): Promise<void> {
        await this.attachComponent(componentPath, {
            position: 'absolute',
            left: 0,
            top: 0
        });
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

<template>
    <div ref="container" class="container-AbsoluteLayout">
        <slot />
        <component v-for="(child, index) in metaData.children" :key="index" :is="child.clazz" v-bind="{ metaData: child, ...getProperties(child.props) }" />
    </div>
</template>

<style scoped>
.container-AbsoluteLayout {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
import DraggableComponent from '@/framework/draggableComponent';
import ContainerComponent from '@/framework/containerComponent';

@Component
export default class AbsoluteLayout extends ContainerComponent {
    protected getContainer(): string {
        return 'container';
    }

    protected async onDropComponent(componentPath: string, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): Promise<void> {
        const containerPosition = $(this.$refs.container).offset();
        if (typeof containerPosition === 'undefined') {
            return;
        }

        await this.attachComponent(componentPath, {
            left: ui.offset.left - containerPosition.left,
            top: ui.offset.top - containerPosition.top
        });
    }

    protected onMoveComponent(component: DraggableComponent | null, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): void {
        if (component !== null && component.inDesigner()) {
            component.metaData.props.left.value = ui.position.left;
            component.metaData.props.top.value = ui.position.top;
            component.metaData.props = {
                ...component.metaData.props
            };
        }
    }

    protected getChildContainerStyles(styles: object): object {
        return {
            ...styles,
            position: 'absolute'
        };
    }
}
</script>

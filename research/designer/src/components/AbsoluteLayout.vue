<template>
    <div ref="container" class="container">
        <component v-for="(child, index) in meta.children" :key="index" :is="child.clazz" v-bind="{ meta: child, ...child.props }" />
    </div>
</template>

<style scoped>
.container {
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
        const containerPosition = $(this.$refs.container).position();
        await this.attachComponent(componentPath, {
            position: 'absolute',
            left: ui.position.left - containerPosition.left,
            top: ui.position.top - containerPosition.top
        });
    }

    protected onMoveComponent(component: DraggableComponent | null, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): void {
        if (component !== null) {
            component.meta.props = {
                ...component.meta.props,
                left: ui.position.left,
                top: ui.position.top
            };
        }
    }
}
</script>

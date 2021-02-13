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
import { Constructor } from 'vue/types/options';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
import DraggableComponent from '@/framework/draggableComponent';
import ContainerComponent from '@/framework/containerComponent';

@Component
export default class AbsoluteLayout extends ContainerComponent {
    protected getContainer(): string {
        return 'container';
    }

    protected onDropComponent(constructor: Constructor, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): void {
        const containerPosition = $(this.$refs.container).position();
        this.attachComponent(constructor, {
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

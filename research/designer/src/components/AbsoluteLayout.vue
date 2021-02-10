<template>
    <div ref="container" class="container">
        <component v-for="(child, index) in this.children" :key="index" :is="child" v-bind="{ ...childrenProps[index] }" />
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
import ContainerComponent from '@/framework/containerComponent';

@Component
export default class AbsoluteLayout extends ContainerComponent {
    protected onDropComponent(constructor: Constructor, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): void {
        const containerPosition = $(this.$refs.container).position();
        this.attachComponent(constructor, {
            position: 'absolute',
            left: ui.position.left - containerPosition.left,
            top: ui.position.top - containerPosition.top
        });
    }

    protected onMoveComponent(componentId: number, event: JQueryEventObject, ui: JQueryUI.DroppableEventUIParam): void {
        this.$set(this.childrenProps, componentId, {
            ...this.childrenProps[componentId],
            left: ui.position.left,
            top: ui.position.top
        });
    }
}
</script>

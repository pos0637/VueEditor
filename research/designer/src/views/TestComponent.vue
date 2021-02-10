<template>
    <div ref="draggable" :style="this.$framework.getStyles(containerStyles)">TestComponent</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DraggableComponent from '@/framework/draggableComponent';

@Component
export default class TestComponent extends DraggableComponent {
    protected getContainer(): string {
        return 'draggable';
    }

    private get containerStyles(): object {
        if (typeof this.position !== 'undefined') {
            return {
                position: this.position,
                left: `${this.left}px`,
                top: `${this.top}px`
            };
        } else {
            return {};
        }
    }

    foo() {
        console.debug('TestComponent::foo');
    }
}
</script>

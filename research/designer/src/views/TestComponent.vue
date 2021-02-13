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

    foo() {
        console.debug('TestComponent::foo');
    }
}
</script>

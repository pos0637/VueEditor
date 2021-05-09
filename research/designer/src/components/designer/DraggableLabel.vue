<template>
    <div ref="draggable" style="display: inline-block;">{{ title }}</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DraggableComponent from '@/framework/draggableComponent';

/**
 * 可拖拽标签组件
 */
@Component
export default class DraggableLabel extends DraggableComponent {
    protected getContainer(): string {
        return 'draggable';
    }
}
</script>

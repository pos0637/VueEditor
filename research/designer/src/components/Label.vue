<template>
    <div ref="draggable" style="display: inline-block;">{{ name }}</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DraggableComponent from '@/framework/draggableComponent';

/**
 * 标签组件
 */
@Component
export default class Label extends DraggableComponent {}
</script>

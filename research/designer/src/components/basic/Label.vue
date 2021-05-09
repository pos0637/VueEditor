<template>
    <div ref="draggable" :style="this.$framework.getStyles(containerStyles)">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { Property } from '@/framework/framework';
import DraggableComponent from '@/framework/draggableComponent';

/**
 * 标签组件
 */
@Component
export default class Label extends DraggableComponent {
    @Prop({ default: 'text' })
    @Property({ title: '文本内容' })
    public text: string | undefined;

    protected getContainer(): string {
        return 'draggable';
    }
}
</script>

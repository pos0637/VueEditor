<template>
    <div ref="draggable" :style="this.$framework.getStyles(containerStyles)">
        <HorizontalLinearLayout>
            <div>1</div>
        </HorizontalLinearLayout>
        <HorizontalLinearLayout>
            <div>2</div>
        </HorizontalLinearLayout>
        <HorizontalLinearLayout>
            <div>3</div>
        </HorizontalLinearLayout>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DraggableComponent from '@/framework/draggableComponent';
import HorizontalLinearLayout from '@/components/layouts/HorizontalLinearLayout.vue';

/**
 * 标签页组件
 */
@Component({
    components: { HorizontalLinearLayout }
})
export default class Tabs extends DraggableComponent {
    protected getContainer(): string {
        return 'draggable';
    }
}
</script>

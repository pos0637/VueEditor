<template>
    <div :style="containerStyles">TestComponent</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '@/framework/baseComponent';

@Component
export default class TestComponent extends BaseComponent {
    mounted() {
        console.debug(this.$props);
    }

    private get containerStyles(): string {
        return `position: ${this.position}; left: ${this.left}px; top: ${this.top}px;`;
    }

    foo() {
        console.debug('TestComponent::foo');
    }
}
</script>

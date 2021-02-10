<template>
    <div ref="container" class="container">
        <component v-for="(child, index) in this.children" :key="index" :is="child" v-bind="{ ...childrenProps[index] }" />
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import ContainerComponent from '@/framework/containerComponent';

@Component
export default class HorizontalLinearLayout extends ContainerComponent {
    protected getContainer(): string {
        return 'container';
    }
}
</script>

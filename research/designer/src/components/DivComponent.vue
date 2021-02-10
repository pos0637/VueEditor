<template>
    <div ref="container" class="container">
        <component v-for="(child, index) in this.children" :key="index" :is="child" />
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import ContainerComponent from '@/framework/containerComponent';

@Component
export default class DivComponent extends ContainerComponent {}
</script>

<template>
    <div ref="container" class="container">
        <component v-for="(child, index) in meta.children" :key="index" :is="child.clazz" v-bind="{ meta: child, ...child.props }" />
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import ContainerComponent from '@/framework/containerComponent';

@Component
export default class DesignerContainer extends ContainerComponent {
    protected getContainer(): string {
        return 'container';
    }

    @Watch('$store.state.designer.hierarchy', { immediate: true, deep: true })
    private onHierarchyChange(val: object) {
        console.debug(val);
    }
}
</script>

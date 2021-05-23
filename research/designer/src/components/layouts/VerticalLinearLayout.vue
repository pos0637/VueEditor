<template>
    <div ref="container" class="container-VerticalLinearLayout">
        <slot />
        <component v-for="(child, index) in computedMetaData.children" :key="index" :is="child.clazz" v-bind="{ metaData: child, ...getProperties(child.props) }" />
    </div>
</template>

<style scoped>
.container-VerticalLinearLayout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import ContainerComponent from '@/framework/containerComponent';

@Component
export default class VerticalLinearLayout extends ContainerComponent {
    protected getContainer(): string {
        return 'container';
    }

    protected getChildContainerStyles(styles: object): object {
        delete styles['left'];
        delete styles['top'];
        return styles;
    }
}
</script>

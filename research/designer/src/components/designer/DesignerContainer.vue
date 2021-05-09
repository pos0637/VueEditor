<template>
    <div class="root">
        <div ref="container" class="container">
            <component v-for="(child, index) in metaData.children" :key="index" :is="child.clazz" v-bind="{ metaData: child, ...getProperties(child.props) }" />
        </div>
        <div class="rulerLayer">
            <vue-ruler-tool :parent="true" :is-scale-revise="true"> </vue-ruler-tool>
        </div>
        <div class="backgroundLayer" />
    </div>
</template>

<style scoped>
.root {
    position: relative;
    width: 100%;
    height: 100%;
}

.container {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    padding: 19px 0px 0px 19px;
}

.rulerLayer {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.backgroundLayer {
    position: absolute;
    left: 19px;
    top: 19px;
    width: calc(100% - 19px);
    height: calc(100% - 19px);
    z-index: -2;
    background: white;
    background-image: linear-gradient(white 14px, transparent 0), linear-gradient(90deg, #58a 1px, transparent 0);
    background-size: 15px 15px, 15px 15px;
}
</style>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import VueRulerTool from 'vue-ruler-tool';
import ContainerComponent from '@/framework/containerComponent';

@Component({
    components: { VueRulerTool }
})
export default class DesignerContainer extends ContainerComponent {
    protected getContainer(): string {
        return 'container';
    }

    @Watch('$store.state.designer.hierarchy', { immediate: true, deep: false })
    private onHierarchyChange(val: object) {
        console.debug(val);
    }
}
</script>

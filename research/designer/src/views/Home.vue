<template>
    <multipane class="designer-layout" layout="vertical">
        <multipane class="left-layout" layout="horizontal">
            <div style="height: 50%; overflow: auto; background: #eee;">
                <ComponentHierarchy style="width: 100%; height: 100%;" />
            </div>
            <multipane-resizer></multipane-resizer>
            <div style="height: 50%; background: #eee; flex-grow: 1;">
                <DraggableLabel title="Label" path="@/components/basic/Label.vue" />
                <DraggableLabel title="Tabs" path="@/components/navigation/Tabs.vue" />
                <DraggableLabel title="HorizontalLinearLayout" path="@/components/layouts/HorizontalLinearLayout.vue" />
                <DraggableLabel title="VerticalLinearLayout" path="@/components/layouts/VerticalLinearLayout.vue" />
                <DraggableLabel title="AbsoluteLayout" path="@/components/layouts/AbsoluteLayout.vue" />
            </div>
        </multipane>
        <multipane-resizer></multipane-resizer>
        <multipane class="center-layout" layout="horizontal">
            <div class="designer-container-layout">
                <DesignerContainer style="width: 100%; height: 100%;" :metaData="hierarchy" />
            </div>
            <multipane-resizer></multipane-resizer>
            <div class="footer-layout">Footer</div>
        </multipane>
        <multipane-resizer></multipane-resizer>
        <multipane class="right-layout" layout="horizontal">
            <ComponentProperties style="width: 100%; height: 100px;" />
        </multipane>
    </multipane>
</template>

<style scoped lang="scss">
.designer-layout {
    flex: 1;
}

.left-layout {
    width: 300px;
}

.center-layout {
    width: 100%;
    z-index: 0;
}

.right-layout {
    width: 300px;
    flex-grow: 1;
    background: #eee;
}

.designer-container-layout {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.footer-layout {
    width: 100%;
    height: 100px;
    background: #eee;
}

.pane {
    text-align: left;
    padding: 15px;
    overflow: hidden;
    background: #eee;
}

.layout-v .multipane-resizer {
    margin: 0;
    left: 0;
    position: relative;
    &:before {
        display: block;
        content: '';
        width: 3px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -1.5px;
        background-color: #ccc;
    }
    &:hover {
        &:before {
            background-color: #999;
        }
    }
}

.layout-h .multipane-resizer {
    margin: 0;
    top: 0;
    position: relative;
    &:before {
        display: block;
        content: '';
        width: 40px;
        height: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.5px;
        margin-left: -20px;
        background-color: #ccc;
    }
    &:hover {
        &:before {
            background-color: #999;
        }
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import DraggableLabel from '@/components/designer/DraggableLabel.vue';
import DesignerContainer from '@/components/designer/DesignerContainer.vue';
import ComponentHierarchy from '@/components/designer/ComponentHierarchy.vue';
import ComponentProperties from '@/components/designer/ComponentProperties.vue';

@Component({
    components: { Multipane, MultipaneResizer, DraggableLabel, DesignerContainer, ComponentHierarchy, ComponentProperties }
})
export default class Home extends Vue {
    private get hierarchy(): object {
        return this.$store.state.designer.hierarchy;
    }
}
</script>

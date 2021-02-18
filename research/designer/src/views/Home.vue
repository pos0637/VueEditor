<template>
    <div class="home">
        <ComponentHierarchy style="width: 300px; height: 300px;" />
        <Label title="Drag TestComponent" path="@/views/TestComponent.vue" />
        <Label title="Drag HorizontalLinearLayout" path="@/components/HorizontalLinearLayout.vue" />
        <Label title="Drag VerticalLinearLayout" path="@/components/VerticalLinearLayout.vue" />
        <Label title="Drag AbsoluteLayout" path="@/components/AbsoluteLayout.vue" />
        <DesignerContainer style="width: 100%; height: 300px;" :metaData="hierarchy" />
        <ComponentProperties style="width: 100%; height: 100px;" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Label from '@/components/Label.vue';
import DesignerContainer from '@/components/DesignerContainer.vue';
import ComponentHierarchy from '@/components/ComponentHierarchy.vue';
import ComponentProperties from '@/components/ComponentProperties.vue';

@Component({
    components: { Label, DesignerContainer, ComponentHierarchy, ComponentProperties }
})
export default class Home extends Vue {
    private get hierarchy(): object {
        return this.$store.state.designer.hierarchy;
    }
}
</script>

<template>
    <div class="home">
        <ComponentHierarchy style="width: 300px; height: 300px;" />
        <Label title="Drag TestComponent" path="@/views/TestComponent.vue" />
        <Label title="Drag HorizontalLinearLayout" path="@/components/HorizontalLinearLayout.vue" />
        <Label title="Drag VerticalLinearLayout" path="@/components/VerticalLinearLayout.vue" />
        <Label title="Drag AbsoluteLayout" path="@/components/AbsoluteLayout.vue" />
        <DesignerContainer style="width: 100%; height: 100px;" :metaData="hierarchy" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Label from '@/components/Label.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import DesignerContainer from '@/components/DesignerContainer.vue';
import ComponentHierarchy from '@/components/ComponentHierarchy.vue';

@Component({
    components: { Label, HelloWorld, DesignerContainer, ComponentHierarchy }
})
export default class Home extends Vue {
    private get hierarchy(): object {
        return this.$store.state.designer.hierarchy;
    }
}
</script>

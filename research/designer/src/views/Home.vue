<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <Label name="Drag TestComponent" path="@/views/TestComponent.vue" />
        <Label name="Drag HorizontalLinearLayout" path="@/components/HorizontalLinearLayout.vue" />
        <Label name="Drag VerticalLinearLayout" path="@/components/VerticalLinearLayout.vue" />
        <Label name="Drag AbsoluteLayout" path="@/components/AbsoluteLayout.vue" />
        <DesignerContainer style="width: 100%; height: 100px;" :meta="hierarchy" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Label from '@/components/Label.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import DesignerContainer from '@/components/DesignerContainer.vue';

@Component({
    components: { Label, HelloWorld, DesignerContainer }
})
export default class Home extends Vue {
    private get hierarchy(): object {
        return this.$store.state.designer.hierarchy;
    }
}
</script>

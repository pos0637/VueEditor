<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <Label name="Drag TestComponent" path="@/views/TestComponent.vue" />
        <Label name="Drag HorizontalLinearLayout" path="@/components/HorizontalLinearLayout.vue" />
        <Label name="Drag VerticalLinearLayout" path="@/components/VerticalLinearLayout.vue" />
        <DivComponent style="width: 100%; height: 100px;" />
        <AbsoluteLayout style="width: 100%; height: 100px;" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Label from '@/components/Label.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import DivComponent from '@/components/DivComponent.vue';
import AbsoluteLayout from '@/components/AbsoluteLayout.vue';

@Component({
    components: { Label, HelloWorld, DivComponent, AbsoluteLayout }
})
export default class Home extends Vue {}
</script>

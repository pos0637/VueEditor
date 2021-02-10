<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <Label name="Drag TestComponent" path="@/views/TestComponent.vue" />
        <DivComponent style="width: 100%; height: 100px;" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Label from '@/components/Label.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import DivComponent from '@/components/DivComponent.vue';

@Component({
    components: { Label, HelloWorld, DivComponent }
})
export default class Home extends Vue {}
</script>

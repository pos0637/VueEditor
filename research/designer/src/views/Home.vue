<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <DraggableComponent name="TestComponent" path="@/views/TestComponent.vue" />
        <DivComponent style="width: 100%; height: 100px;" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DraggableComponent from '@/framework/draggableComponent.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import DivComponent from '@/components/DivComponent.vue';

@Component({
    components: { DraggableComponent, HelloWorld, DivComponent }
})
export default class Home extends Vue {}
</script>

<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <drag :transfer-data="{ component: '@/views/TestComponent.vue' }">
            TestComponent
        </drag>
        <DivComponent ref="container" style="width: 100%; height: 100px;" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Drag } from 'vue-drag-drop';
import HelloWorld from '@/components/HelloWorld.vue';
import DivComponent from '@/components/DivComponent.vue';

@Component({
    components: { Drag, HelloWorld, DivComponent }
})
export default class Home extends Vue {}
</script>

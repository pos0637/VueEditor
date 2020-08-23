<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <drag :transfer-data="{ component: '@/views/TestComponent.vue' }">
            TestComponent
        </drag>
        <drop @drop="_handleDrop">
            <DivComponent ref="container" style="width: 100%; height: 100px;" />
            <HelloWorld msg="Welcome to Your Vue.js App" />
        </drop>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Drag, Drop } from 'vue-drag-drop';
import { DragData } from '@/framework/baseComponent';
import HelloWorld from '@/components/HelloWorld.vue';
import DivComponent from '@/components/DivComponent.vue';

@Component({
    components: { Drag, Drop, HelloWorld, DivComponent }
})
export default class Home extends Vue {
    private async _handleDrop(data: DragData) {
        this.$framework.attachComponent(data);
    }
}
</script>

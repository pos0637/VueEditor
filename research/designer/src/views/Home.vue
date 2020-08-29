<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div ref="draggable" style="display: inline-block;">TestComponent</div>
        <DivComponent ref="container" style="width: 100%; height: 100px;" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';
import HelloWorld from '@/components/HelloWorld.vue';
import DivComponent from '@/components/DivComponent.vue';

@Component({
    components: { HelloWorld, DivComponent }
})
export default class Home extends Vue {
    mounted() {
        $(this.$refs.draggable).draggable({
            cursor: 'move',
            helper: 'clone',
            zIndex: -1,
            stop: () => this.$framework.attachComponent('@/views/TestComponent.vue')
        });
    }
}
</script>

<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <a-button type="primary" @click="foo">
            Add Component
        </a-button>
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
    components: { HelloWorld }
})
export default class Home extends Vue {
    paths: Array<string> = [
        '@/views/TestComponent.vue',
        '@/views/TestComponent.vue',
        '@/views/TestComponent.vue'
    ];

    async foo() {
        this.$framework.generateComponent(this.paths[0]);
    }
}
</script>

<template>
    <div ref="container"></div>
</template>

<script lang="ts">
import BaseComponent from '@/framework/baseComponent';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DivComponent extends BaseComponent {
    async appendChild(component: Vue) {
        component.$mount();
        (this.$refs.container as HTMLElement).appendChild(component.$el);
    }
}
</script>

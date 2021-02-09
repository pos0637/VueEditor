<template>
    <div ref="container" class="container">
        <component v-for="(child, index) in this.children" :key="index" :is="child" />
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';
import BaseComponent from '@/framework/baseComponent';

@Component
export default class DivComponent extends BaseComponent {
    mounted() {
        $(this.$refs.container).droppable({
            over: () => {
                this.$framework.focusComponent = this;
                this.setBackgroundHighlight(true);
            },
            out: () => {
                if (this.$framework.focusComponent === this) {
                    this.$framework.focusComponent = null;
                }
                this.setBackgroundHighlight(false);
            }
        });
    }
}
</script>

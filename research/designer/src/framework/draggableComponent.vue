<template>
    <div ref="draggable" style="display: inline-block;">{{ name }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';

/**
 * 可拖拽组件
 */
@Component
export default class DraggableComponent extends Vue {
    /**
     * 名称
     */
    @Prop() private name!: string;

    /**
     * 路径
     */
    @Prop() private path!: string;

    mounted() {
        $(this.$refs.draggable).draggable({
            cursor: 'move',
            helper: 'clone',
            zIndex: -1,
            stop: () => this.$framework.attachComponent(this.path)
        });
    }
}
</script>

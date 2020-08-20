<template>
    <drop class="drop" @drop="_handleDrop">
        <div ref="container" class="container"></div>
    </drop>
</template>

<style scoped>
.drop {
    width: 100%;
    height: 100%;
}

.container {
    width: 100%;
    height: 100%;
}
</style>

<script lang="ts">
import { Drop } from 'vue-drag-drop';
import BaseComponent, { DragData } from '@/framework/baseComponent';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: { Drop }
})
export default class DivComponent extends BaseComponent {
    async appendChild(component: Vue) {
        component.$mount();
        (this.$refs.container as HTMLElement).appendChild(component.$el);
    }

    async _handleDrop(data: DragData) {
        const component = await this.$framework.generateComponent(
            data.component
        );
        this.appendChild(component);
    }
}
</script>

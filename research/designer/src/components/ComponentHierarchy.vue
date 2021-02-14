<template>
    <div ref="container" class="container">
        <Tree ref="tree" edgeScroll :value="treeData" v-on:change="onTreeChanged">
            <span slot-scope="{ node, path, tree }">
                <b @click="tree.toggleFold(node, path)">
                    {{ node.$folded ? '+' : '-' }}
                </b>
                {{ node.name }}
            </span>
        </Tree>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>

<script>
import { Tree, Fold, Draggable } from 'he-tree-vue';
import 'he-tree-vue/dist/he-tree-vue.css';

export default {
    components: { Tree: Tree.mixPlugins([Fold, Draggable]) },
    data() {
        return {
            data1: []
        };
    },
    computed: {
        treeData() {
            return this.data1;
        }
    },
    watch: {
        '$store.state.designer.hierarchy': {
            handler: function(newVal) {
                console.debug(`watch: ${JSON.stringify(newVal)}`);
                this.data1 = newVal.children;
            },
            immediate: false,
            deep: true
        }
    },
    methods: {
        onTreeChanged() {
            console.debug(JSON.stringify(this.$refs.tree.getPureTreeData()));
        }
    }
};
</script>

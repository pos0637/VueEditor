<template>
    <div ref="container" class="container">
        <Tree ref="tree" edgeScroll :value="treeData" :eachDroppable="eachDroppable" v-on:change="onTreeChanged">
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
            rowData: []
        };
    },
    computed: {
        treeData() {
            return this.rowData;
        }
    },
    watch: {
        '$store.state.designer.hierarchy': {
            handler: function(newVal) {
                this.rowData = newVal.children;
            },
            immediate: false,
            deep: true
        }
    },
    methods: {
        onTreeChanged() {
            this.$store.commit('setHierarchy', { children: this.$refs.tree.getPureTreeData() });
        },
        eachDroppable(currentPath) {
            const node = this.$refs.tree.getNodeByPath(currentPath);
            if (typeof node !== 'undefined') {
                return typeof node.props.isContainer !== 'undefined' && node.props.isContainer.value;
            }

            return true;
        }
    }
};
</script>

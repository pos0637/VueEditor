<template>
    <div ref="container" class="container">
        <Tree ref="tree" edgeScroll :value="treeData" :eachDroppable="eachDroppable" v-on:change="onTreeChanged">
            <div slot-scope="{ node, path, tree }" :style="getNodeStyles(node)" @click="onNodeClick(node)">
                <b v-if="node.children.length > 0" @click="tree.toggleFold(node, path)">
                    {{ node.$folded ? '+' : '-' }}
                </b>
                {{ node.name }}
            </div>
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
            focusComponent: null,
            rowData: []
        };
    },
    computed: {
        treeData() {
            return this.rowData;
        }
    },
    watch: {
        '$store.state.designer.focusComponent': {
            handler: function(newVal) {
                this.focusComponent = newVal;
            },
            immediate: true
        },
        '$store.state.designer.hierarchy': {
            handler: function(newVal) {
                this.rowData = newVal.children;
            },
            immediate: false,
            deep: false
        }
    },
    methods: {
        getNodeStyles(node) {
            return this.focusComponent && node === this.focusComponent.metaData ? { backgroundColor: '#C1E0FF' } : {};
        },
        onNodeClick(node) {
            if (typeof node.ref !== 'undefined') {
                this.$framework.setFocusComponent(node.ref);
                this.$store.commit('setFocusComponent', node.ref);
            }
        },
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

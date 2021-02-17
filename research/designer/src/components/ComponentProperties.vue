<template>
    <div ref="container" class="container">
        <div>name: {{ focusComponent && focusComponent.metaData.name }}</div>
        <div>props:</div>
        <div v-for="(prop, key) in focusComponent ? focusComponent.metaData.props : {}" :key="key">{{ key }}: {{ prop.value }}</div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>

<script>
export default {
    data() {
        return {
            focusComponent: null
        };
    },
    watch: {
        '$store.state.designer.focusComponent': {
            handler: function(newVal) {
                this.focusComponent = newVal;
            },
            immediate: true
        }
    },
    methods: {}
};
</script>

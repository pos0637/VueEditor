<template>
    <div ref="container" class="container">
        <div>name: {{ focusComponent && focusComponent.metaData.name }}</div>
        <div>props:</div>
        <div v-for="(prop, key) in properties" :key="key">{{ prop.title }}: <input v-model="prop.value" :placeholder="prop.title" :disabled="prop.readonly" /></div>
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
    computed: {
        properties() {
            if (this.focusComponent === null) {
                return {};
            }

            const result = {};
            for (const key in this.focusComponent.metaData.props) {
                const prop = this.focusComponent.metaData.props[key];
                if (!prop.visiable) {
                    continue;
                }

                result[key] = prop;
            }

            return result;
        }
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

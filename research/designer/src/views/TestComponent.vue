<template>
    <div>TestComponent</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TestComponent extends Vue {
    foo() {
        console.debug('TestComponent::foo');
    }
}
</script>

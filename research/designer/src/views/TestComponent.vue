<template>
    <div>TestComponent</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '@/framework/baseComponent';

@Component
export default class TestComponent extends BaseComponent {
    foo() {
        console.debug('TestComponent::foo');
    }
}
</script>

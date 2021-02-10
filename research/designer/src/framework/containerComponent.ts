import { Component } from 'vue-property-decorator';
import $ from 'jquery';
import 'jqueryui';
import BaseComponent from '@/framework/baseComponent';

@Component
export default class ContainerComponent extends BaseComponent {
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

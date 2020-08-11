import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $framework: any;
    }
}

const framework = {
    install: function(vue: typeof Vue): void {
        vue.prototype.$framework = {
            foo: function() {
                alert('foo');
            }
        };
    }
};

export default framework;

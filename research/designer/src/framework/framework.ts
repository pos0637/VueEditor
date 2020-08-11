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
                console.debug('foo');
            }
        };
    }
};

export default framework;

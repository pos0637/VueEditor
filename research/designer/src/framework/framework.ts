import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $framework: Framework;
    }
}

class Framework {
    foo() {
        console.debug('foo');
    }

    async generateComponent(path: string) {
        const loader = await import(
            `@/${path.substring(2, path.length - 4)}.vue`
        );
        console.debug(loader);
    }
}

const framework = {
    install: function(vue: typeof Vue): void {
        vue.prototype.$framework = new Framework();
    }
};

export default framework;

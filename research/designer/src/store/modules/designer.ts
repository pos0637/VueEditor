import { Meta } from '@/framework/baseComponent';

const designer = {
    state: {
        hierarchy: {
            children: []
        }
    },
    mutations: {
        // eslint-disable-next-line
        setHierarchy(state: any, hierarchy: Meta) {
            state.hierarchy = hierarchy;
        },
        // eslint-disable-next-line
        updateHierarchy(state: any) {
            console.debug('updateHierarchy');
            state.hierarchy = { ...state.hierarchy };
        }
    }
};

export default designer;

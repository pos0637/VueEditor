import { MetaData } from '@/framework/baseComponent';

const designer = {
    state: {
        hierarchy: {
            children: []
        }
    },
    mutations: {
        setHierarchy(state: any, hierarchy: MetaData) {
            state.hierarchy = hierarchy;
        },
        updateHierarchy(state: any) {
            state.hierarchy = { ...state.hierarchy };
        }
    }
};

export default designer;

import BaseComponent, { MetaData } from '@/framework/baseComponent';

const designer = {
    state: {
        focusComponent: null,
        hierarchy: {
            children: []
        }
    },
    mutations: {
        /**
         * 设置焦点组件
         *
         * @param {*} state 状态
         * @param {BaseComponent} [focusComponent] 焦点组件
         */
        setFocusComponent(state: any, focusComponent?: BaseComponent) {
            state.focusComponent = focusComponent;
        },
        /**
         * 设置组件层级结构
         *
         * @param {*} state 状态
         * @param {MetaData} hierarchy 组件层级结构
         */
        setHierarchy(state: any, hierarchy: MetaData) {
            state.hierarchy = hierarchy;
        },
        /**
         * 更新组件层级结构
         *
         * @param {*} state 状态
         */
        updateHierarchy(state: any) {
            state.hierarchy = { ...state.hierarchy };
        }
    }
};

export default designer;

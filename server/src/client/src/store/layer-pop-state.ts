export const layerPopState = (() => {
    let state: string[] = [];

    return {
        pop: () => {
            return state.pop();
        },
        push: (value: string) => {
            state.push(value);
        },
        at: (index: number) => {
            if (index < 0 || index >= state.length) {
                if (index < 0) {
                    index = state.length + index;
                    if (index < 0) {
                        index = 0;
                    }
                }
                if (index >= state.length) {
                    index = state.length - 1;
                }
                return state[index];
            }
            return state[index];
        },
        includes: (value: string) => {
            return state.includes(value);
        },
    };
})();
export const layerPopState = (() => {
    let state: string[] = [];

    return {
        get: () => {
            return state;
        },
        pop: () => {
            return state.pop();
        },
        push: (value: string) => {
            history.pushState(value, "", `#${value}`);
            state.push(value);
        },
        back: (value: string) => {
            if (state.includes(value)) {
                history.back();
                state = state.filter((v) => v !== value);
            }
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
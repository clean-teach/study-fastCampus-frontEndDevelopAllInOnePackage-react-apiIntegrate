export const initialState = {
    users: {
        loading: false,
        data: null,
        error: null,
    },
    user: {
        loading: false,
        data: null,
        error: null,
    },
};

const loadingState = {
    loading: true,
    data: null,
    error: null,
};
const success = data => ({
    loading: false,
    data,
    error: null,
});
const error = error => ({
    loading: false,
    data: null,
    error,
});

export function createReducerHandler(type, key) {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    function handler(state, action) {
        switch (action.type) {
            case type: 
                return {
                    ...state,
                    [key]: loadingState
                }
            case SUCCESS: 
                return {
                    ...state,
                    [key]: success(action.data)
                }
            case ERROR: 
                return {
                    ...state,
                    [key]: error(action.error)
                }
            default:
                throw new Error(`Unhandled action type ${action.type}`);
        }
    }

    return handler;
}

export function createActionDispatcher(type, promiseFn) {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    async function actionHandler(dispatch, ...rest){
        dispatch({type});
        try {
            const data = await promiseFn(...rest);
            dispatch({type: SUCCESS, data});
        } catch (error) {
            dispatch({type: ERROR, error});
        }
    }

    return actionHandler;
}
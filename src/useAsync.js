import { useEffect, useReducer } from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                data: null,
                loading : true,
                error: null,
            }
        case 'SUCCESS':
            return {
                data: action.data,
                loading : false,
                error: null,
            }
        case 'ERROR':
            return {
                data: null,
                loading : false,
                error: action.error,
            }
        default:
            throw new Error('Unhandled action type: ' + action.type);
    }
}

function useAsync(callback, deps= [], skip= false) {
    const [state, dispatch] = useReducer(reducer, {
        data: null,
        loading : false,
        error: null,
    });

    const fetchData = async () => {
        dispatch({type: 'LOADING'});
        try {
            const data = await callback();
            dispatch({type: 'SUCCESS', data: data});
        } catch(error) {
            dispatch({type: 'ERROR', error});
        }
    };

    useEffect(() => {
        if(skip){
            return
        }
        fetchData();
        // eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData]
}

export default useAsync;
import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
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

function reducer(state, action) {
    switch (action.type) {
        case 'GET_USERS': 
            return {
                ...state,
                users: loadingState
            }
        case 'GET_USERS_SUCCESS': 
            return {
                ...state,
                users: success(action.data)
            }
        case 'GET_USERS_ERROR': 
            return {
                ...state,
                users: error(action.error)
            }
        case 'GET_USER': 
            return {
                ...state,
                user: loadingState
            }
        case 'GET_USER_SUCCESS': 
            return {
                ...state,
                user: success(action.data)
            }
        case 'GET_USER_ERROR': 
            return {
                ...state,
                user: error(action.error)
            }
        default:
            throw new Error(`Unhandled action type ${action.type}`);
    }
}

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    );
}

export function useUsersState() {
    const state = useContext(UsersStateContext);
    if(!state){
        throw new Error('Can not find Provider');
    }
    return state;
}
export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if(!dispatch){
        throw new Error('Can not find Provider');
    }
    return dispatch;
}

export async function getUsers(dispatch) {
    dispatch({type: 'GET_USERS'});
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // const response = await axios.get('https://jsonplaceholder.typicode.com/users/showmeerror'); // 에러발생 확인용
        dispatch({type: 'GET_USERS_SUCCESS', data: response.data});
    } catch (error) {
        dispatch({type: 'GET_USERS_ERROR', error});
    }
}
export async function getUser(dispatch, id) {
    dispatch({type: 'GET_USER'});
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        // const response = await axios.get('https://jsonplaceholder.typicode.com/users/showmeerror'); // 에러발생 확인용
        dispatch({type: 'GET_USER_SUCCESS', data: response.data});
    } catch (error) {
        dispatch({type: 'GET_USER_ERROR', error});
    }
}
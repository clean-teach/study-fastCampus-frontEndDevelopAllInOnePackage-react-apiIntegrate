import React, { createContext, useContext, useReducer } from 'react';
import {initialState, createReducerHandler, createActionDispatcher} from './utils/asyncActionUtils';
import * as api from './utils/api';

const usersHandler = createReducerHandler('GET_USERS', 'users');
const userHandler = createReducerHandler('GET_USER', 'user');

function reducer(state, action) {
    switch (action.type) {
        case 'GET_USERS': 
        case 'GET_USERS_SUCCESS': 
        case 'GET_USERS_ERROR': 
            return usersHandler(state, action);
        case 'GET_USER': 
        case 'GET_USER_SUCCESS': 
        case 'GET_USER_ERROR': 
            return userHandler(state, action);
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

export const getUsers = createActionDispatcher('GET_USERS', api.getUsers);
export const getUser = createActionDispatcher('GET_USER', api.getUser);
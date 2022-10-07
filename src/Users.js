import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

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

function Users() {
    const [state, dispatch] = useReducer(reducer, {
        data: null,
        loading : false,
        error: null,
    });

    const fetchUsers = async () => {
        try {
            dispatch({type: 'LOADING'});

            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            // const response = await axios.get('https://jsonplaceholder.typicode.com/users/showmeerror'); // 에러발생 확인용

            dispatch({type: 'SUCCESS', data: response.data});
        } catch(error) {
            dispatch({type: 'ERROR', error});
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const {data: users, loading, error} = state;

    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생!</div>
    if(!users) return <div>검색 결과가 없습니다.</div>

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
}

export default Users;
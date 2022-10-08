import React, { useState } from 'react';
// import useAsync from './useAsync';
// import { useAsync } from 'react-async';
import User from './User';
import { getUsers, useUsersDispatch, useUsersState } from '../UsersContext';

function Users() {
    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const {loading, data: users, error} = state.users;
    const fetchData = () => {
        getUsers(dispatch);
    };


    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생!</div>

    return (
        <>
            <button onClick={fetchData}>불러오기</button>
            <h2>사용자 리스트</h2>
            {!users ? 
                <div>검색 결과가 없습니다.</div>
            :
                <ul>
                    {users.map(user => (
                        <li key={user.id} onClick={() => setUserId(user.id)} style={{cursor: 'pointer'}}>
                            {user.username} ({user.name})
                        </li>
                    ))}
                </ul>
            }
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
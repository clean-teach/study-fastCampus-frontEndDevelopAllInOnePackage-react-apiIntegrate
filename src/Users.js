import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    // const response = await axios.get('https://jsonplaceholder.typicode.com/users/showmeerror'); // 에러발생 확인용

    return response.data;
}

function Users() {
    const [state, refetch] = useAsync(getUsers, [], true);
    const {data: users, loading, error} = state;

    const [userId, setUserId] = useState(null);

    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생!</div>

    return (
        <>
            <button onClick={refetch}>불러오기</button>
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
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setUsers(null);
            setError(null);
            setLoading(true);

            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            // const response = await axios.get('https://jsonplaceholder.typicode.com/users/showmeerror'); // 에러발생 확인용

            setUsers(response.data);
        } catch(error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
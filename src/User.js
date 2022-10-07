import React from 'react';
import axios from 'axios';
// import useAsync from './useAsync';
import { useAsync } from 'react-async';

async function getUser({id}) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    // const response = await axios.get('https://jsonplaceholder.typicode.com/users/showmeerror'); // 에러발생 확인용

    return response.data;
}

function User({id}) {
    const {data: user, error, isLoading} = useAsync({
        promiseFn: getUser,
        id,
        watch: id
    });

    if(isLoading) return <div>로딩중...</div>
    if(error) return <div>에러 발생!</div>

    return (
        <>
            {!user ? 
                <div>검색 결과가 없습니다.</div>
            :
                <div>
                    <h3>{user.username}</h3>
                    <p><b>E-mail : </b>{user.email}</p>
                </div>
            }
        </>
    );
}

export default User;
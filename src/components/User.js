import React, { useEffect } from 'react';
import { getUser, useUsersDispatch, useUsersState } from '../UsersContext';
// import useAsync from './useAsync';
// import { useAsync } from 'react-async';

function User({id}) {
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    useEffect(()=> {
        getUser(dispatch, id);
    }, [dispatch, id]);

    const {loading, data: user, error} = state.user;

    if(loading) return <div>로딩중...</div>
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
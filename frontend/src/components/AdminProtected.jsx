import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminProtected({ children }) {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const history = useHistory();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
    }, [userInfo, history]);

    return (
        <div>
            {children}
        </div>
    )
}

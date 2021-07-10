import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminProtected from '../components/AdminProtected';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';

export default function UserListScreen({ history }) {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch, successDelete]);

    const deleteHandler = (id) => {
        const confirm = window.confirm('Are you sure ??');
        if (!confirm) return;
        dispatch(deleteUser(id));
    }

    return (
        <AdminProtected>
            <h1>Users</h1>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {users && (
                <Table striped bordered hover responsive className="tab-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>Email</th>
                            <th>ADMIN</th>
                            <th>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin
                                    ? <i className="fas fa-check" style={{ color: "green" }}></i>
                                    : <i className="fas fa-times" style={{ color: "red" }}></i>}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                        <i className="fas fa-trash-alt">
                                        </i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </AdminProtected>
    )
}

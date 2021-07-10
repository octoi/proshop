import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import AdminProtected from '../components/AdminProtected';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function EditUserScreen({ match, history }) {
    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    }

    return (
        <AdminProtected>
            <Link to="/admin/userlist">Go Back</Link>

            <FormContainer>
                <h1>Edit User</h1>

                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {error && <Message variant="danger">{error}</Message>}

                {loading && <Loader />}
                {loadingUpdate && <Loader />}

                {user && (
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mt-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="isadmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                value={isAdmin}
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mt-3" type="submit" variant="primary">Update</Button>

                    </Form>
                )}
            </FormContainer>
        </AdminProtected>
    )
}

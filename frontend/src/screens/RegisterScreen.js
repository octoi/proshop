import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

export default function RegisterScreen({ location, history }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const redirect = location.search ? location.search.split("=")[1] : '/';

	const userRegister = useSelector(state => state.userRegister);
	const { error, loading, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [userInfo, history, redirect])

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Passwords do not match !')
			return;
		}

		setMessage('');
		dispatch(register(name, email, password));
	}

	return (
		<FormContainer>
			<h1>Register</h1>

			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}

			<Form onSubmit={submitHandler}>

				<Form.Group className="mt-3" controlId="name">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mt-3" controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mt-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mt-3" controlId="passwordConfirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Button className="mt-3" type="submit" variant="primary">Register</Button>

			</Form>

			<Row className='py-3'>
				<Col>
					Have An Account? <Link
						to={redirect ? `/login?redirect=${redirect}` : '/register'}>
						Sign In
					</Link>
				</Col>
			</Row>

		</FormContainer >
	)
}

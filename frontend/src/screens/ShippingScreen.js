import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

export default function ShippingScreen({ history }) {
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className="mt-3" controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={address ? address : ''}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mt-3" controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={city ? city : ''}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mt-3" controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter postal code"
						value={postalCode ? postalCode : ''}
						onChange={(e) => setPostalCode(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mt-3" controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter country"
						value={country ? country : ''}
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
				</Form.Group>

				<Button className="mt-3" type="submit" variant="primary">Continue</Button>
			</Form>
		</FormContainer>
	)
}

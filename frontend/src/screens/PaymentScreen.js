import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentScreen({ history }) {
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	const dispatch = useDispatch();

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	if (!shippingAddress.address) {
		history.push('/shipping');
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod))
		history.push('/placeorder');
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col className="mt-5">
						<Form.Check
							type="radio"
							label="PayPal Or Credit Card"
							id="paypal"
							name="paymentMethod"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						>
						</Form.Check>
					</Col>
				</Form.Group>

				<Button className="mt-3" type="submit" variant="primary">Continue</Button>
			</Form>
		</FormContainer>
	)
}

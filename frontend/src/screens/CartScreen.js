import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../components/Message';

export default function CartScreen({ match, location, history }) {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			let dataQty = isNaN(qty) ? 1 : qty;
			dispatch(addToCart(productId, dataQty));
		}
	}, [productId, qty, dispatch]);

	const removeFromCartHandler = (id) => {
		let permission = window.confirm('Are you sure')
		if (permission) dispatch(removeFromCart(id));
	}

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping cart</h1>
				{cartItems.length === 0 ? (
					<Message variant='info'>
						Your cart is empty <Link to='/'>Go back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map(item => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={3}>
										<Col className="my-1">
											<div>
												<Button
													className="me-3 rounded"
													variant="dark"
													disabled={item.qty === 1}
													onClick={() => dispatch(addToCart(item.product, item.qty - 1))}
												>-</Button>
												<span className="me-3">{item.qty}</span>
												<Button
													className="rounded"
													variant="dark"
													disabled={item.qty === item.countInStock}
													onClick={() => dispatch(addToCart(item.product, item.qty + 1))}
												>+</Button>
											</div>
										</Col>
									</Col>
									<Col md={1}>
										<Button
											type='button'
											className='rounded'
											variant='dark'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h2>
							${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
						</ListGroup.Item>
					</ListGroup>

					<ListGroup.Item>
						<Button
							type='button'
							className='btn-block'
							style={{ width: '100%' }}
							disabled={cartItems.length === 0}
							onClick={checkoutHandler}
						>Proceed To Checkout</Button>
					</ListGroup.Item>
				</Card>
			</Col>
		</Row>
	)
}

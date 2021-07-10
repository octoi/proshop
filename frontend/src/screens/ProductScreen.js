import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

export default function ProductScreen({ match, history }) {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const { userInfo } = useSelector(state => state.userLogin);
	const { loading, error, product } = useSelector(state => state.productDetails);
	const {
		loading: loadingProductReview,
		error: errorReviewCreate,
		success: successReviewCreate
	} = useSelector(state => state.productReviewCreate);

	useEffect(() => {
		if (successReviewCreate) {
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}

		dispatch(listProductDetails(match.params.id))
	}, [match, dispatch, successReviewCreate])

	const addToCartHandler = () => {
		console.log(`Add to cart: ${match.params.id}`);
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	}

	const submitHandler = (e) => {
		e.preventDefault();
		const reviewData = { rating, comment }
		dispatch(createProductReview(match.params.id, reviewData));
	}

	return (
		<div>
			<Link to="/" className="btn btn-light my-3">Go Back</Link>
			{loading && <Loader />}
			{error && <Message variant='danger'>{error}</Message>}
			{product && <div>
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>

					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>

							<ListGroup.Item>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} color="#f8e825" />
							</ListGroup.Item>

							<ListGroup.Item>
								Price: ${product.price}
							</ListGroup.Item>

							<ListGroup.Item>
								Description : {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col><strong>${product.price}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col className="my-1">
												<div>
													<Button
														className="btn-sm"
														variant="dark"
														disabled={qty === 1}
														onClick={() => setQty(qty - 1)}
													>-</Button>
													<span style={{ margin: '0 2px' }}>{qty}</span>
													<Button
														className="btn-sm"
														variant="dark"
														disabled={qty === product.countInStock}
														onClick={() => setQty(qty + 1)}
													>+</Button>
												</div>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button onClick={addToCartHandler} className="w-100" type="button" disabled={!product.countInStock}>Add To Cart</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>

				<Row className="mt-4">
					<Col md={6}>
						<h4>Reviews</h4>
						{product.reviews.length === 0 && <Message variant="info">No reviews</Message>}
						<ListGroup variant="flush">
							{product.reviews.map(review => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} color='#f8e825' />
									<p>{review.createdAt.substring(0, 10)}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}

							<ListGroup.Item>
								<h4>Write a review</h4>

								{loadingProductReview && <Loader />}
								{successReviewCreate && <Message variant="success">Review created successfully</Message>}
								{errorReviewCreate && <Message variant="danger">{errorReviewCreate}</Message>}

								{!userInfo && <Message variant="info">Please <Link to="/login">login</Link> to write a review</Message>}

								{userInfo && <Form onSubmit={submitHandler}>
									<Form.Group controlId="rating">
										<Form.Label>Rating</Form.Label>
										<Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
											<option value=''>Select ..</option>
											<option value='1'>1 - Poor</option>
											<option value='2'>2 - Fair</option>
											<option value='3'>3 - Good</option>
											<option value='4'>4 - Very Good</option>
											<option value='5'>5 - Excellent</option>
										</Form.Control>
									</Form.Group>
									<Form.Group controlId="review">
										<Form.Label>Review</Form.Label>
										<Form.Control
											as="textarea"
											row={5}
											value={comment}
											placeholder="Enter review"
											onChange={(e) => setComment(e.target.value)}
										/>
									</Form.Group>
									<Button disabled={loadingProductReview} type="submit">Submit</Button>
								</Form>}
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</div>}
		</div >
	)
}

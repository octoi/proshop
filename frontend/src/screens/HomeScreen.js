import React, { useEffect } from 'react';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen({ history }) {
	const dispatch = useDispatch();
	const productList = useSelector(state => state.productList);
	const { loading, error, products, pages, page } = productList;

	let keyword = history.location.search;

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);

	return (
		<div>
			{!keyword && <ProductCarousel />}
			<h1>Latest products</h1>
			{loading && <Loader />}
			{error && <Message variant='danger'>{error}</Message>}
			{!loading && products && products.length === 0 && <Message variant="info">
				Couldn't find product {keyword && `with keyword '${new URLSearchParams(keyword).get('keyword')}'`}
			</Message>}
			{products && <Row>
				{products.map(product => (
					<Col key={product._id} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>}
			<Paginate page={page} pages={pages} keyword={keyword} />
		</div>
	)
}

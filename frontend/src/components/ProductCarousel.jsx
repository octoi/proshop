import React, { useEffect } from 'react';
import Loader from './Loader';
import Message from './Message';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { listTopProducts } from '../actions/productActions';

export default function ProductCarousel() {
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.productTopRated);

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return (
        <div>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {products && (
                <Carousel pause="hover" className="bg-dark">
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image fluid src={product.image} alt={product.name} />
                                <Carousel.Caption className="carousel.caption">
                                    <h4>{product.name} (${product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

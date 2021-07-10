import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminProtected from '../components/AdminProtected';
import Paginate from '../components/Paginate';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen({ history, match }) {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    let keyword = history.location.search;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}`);
        } else {
            dispatch(listProducts(keyword));
        }
    }, [dispatch, successDelete, successCreate, createdProduct, history, keyword]);

    const deleteHandler = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this product ??');
        if (!confirm) return;
        dispatch(deleteProduct(id));
    }

    const createProductHandler = () => {
        dispatch(createProduct());
    }

    return (
        <AdminProtected>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3 float-end" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            {products && (
                <div>
                    <Table striped bordered hover responsive className="tab-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin />
                </div>
            )}
        </AdminProtected>
    )
}

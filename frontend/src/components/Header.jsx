import React from 'react';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	const logoutHandler = () => {
		const confirm = window.confirm('Are you sure ??');
		if (confirm) dispatch(logout());
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand href="/">ProShop</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkContainer to="/cart">
							<Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
						</LinkContainer>

						{userInfo ? (
							<NavDropdown title={userInfo.name} id={userInfo.username}>
								<LinkContainer to="/profile">
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
							</NavDropdown>
						) : (
							<LinkContainer to="/login">
								<Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
							</LinkContainer>
						)}
						{userInfo && userInfo.isAdmin && (
							<NavDropdown title="Admin" id="admin-menu">
								<LinkContainer to="/admin/userlist">
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/admin/productlist">
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/admin/orderlist">
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
					<SearchBox />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

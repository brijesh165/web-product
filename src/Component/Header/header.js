import React, { useState, useEffect } from 'react';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import './header.css';

const Header = (props) => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const count = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0;
        setItemCount(count)
    }, [localStorage.getItem("cartItems")])

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand href="/" className="mr-auto">Meetings</NavbarBrand>
                    <Nav navbar className="mr-2">
                        <NavItem>
                            <NavLink href="/order-cart">
                                <div className="wrapper">
                                    Cart
                                    {itemCount > 0 && <span>{itemCount}</span>}
                                </div>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
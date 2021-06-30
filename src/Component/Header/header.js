import React from 'react';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

const Header = () => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand href="/" className="mr-auto">Meetings</NavbarBrand>
                    <Nav navbar className="mr-2">
                        <NavItem>
                            <NavLink href="/">All</NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
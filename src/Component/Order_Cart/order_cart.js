
import React from 'react';
import { withRouter } from 'react-router';

import './order_cart.css';
import {
    Table, Container, Input, Button, Alert,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import Header from '../Header/header';


class OrderCart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: [],
            checkoutSuccessModal: false
        }

        this._handleQuantityChange = this._handleQuantityChange.bind(this);
        this._handleRemoveItemFromCart = this._handleRemoveItemFromCart.bind(this);
        this._handleContinueShoppingCart = this._handleContinueShoppingCart.bind(this);
        this._handleCheckout = this._handleCheckout.bind(this);
    }

    componentDidMount() {
        // get cart item from local storage and set it into the state
        if (localStorage.getItem('cartItems')) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            this.setState({
                cartItems: [...this.state.cartItems, ...cartItems]
            })
        }
    }

    // called when user change the quantity
    _handleQuantityChange(e, item, quantity) {
        const currentValue = e.target.value;
        if (currentValue - quantity == 1) {
            const allItems = JSON.parse(localStorage.getItem('cartItems'));
            const itemExist = allItems.find((product) => product.item._id === item._id);
            if (itemExist) {
                itemExist.quantity++;
                localStorage.setItem('cartItems', JSON.stringify(allItems));
            }
            this.setState({
                cartItems: allItems
            })
        } else if (currentValue - quantity == -1) {
            const allItems = JSON.parse(localStorage.getItem('cartItems'));
            const itemExist = allItems.find((product) => product.item._id === item._id);
            if (itemExist) {
                itemExist.quantity--;
                localStorage.setItem('cartItems', JSON.stringify(allItems));
            }
            this.setState({
                cartItems: allItems
            })
        }
    }

    // called when user click on remove button
    _handleRemoveItemFromCart(id) {
        const allItemsFromCart = JSON.parse(localStorage.getItem('cartItems'));
        const afterRemoveItemFromCart = allItemsFromCart.filter((product) => product.item._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(afterRemoveItemFromCart));
        this.setState({
            cartItems: afterRemoveItemFromCart
        })
    }

    // called when user click on countinue shopping button
    _handleContinueShoppingCart() {
        this.props.history.push({ pathname: "/" })
    }

    // called when user click on checkout
    _handleCheckout() {
        this.setState({
            checkoutSuccessModal: true
        })
        setTimeout(() => {
            localStorage.removeItem("cartItems");
            this.setState({
                checkoutSuccessModal: false
            })
            this.props.history.push({
                pathname: "/",
            })
        }, 2000);

    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Container className="mt-4">
                    {this.state.cartItems.length > 0 ?
                        <Table style={{ textAlign: 'left' }}>
                            <thead>
                                <tr>
                                    <th>image</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cartItems.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td width="30%">
                                                <img src={`http://localhost:3001/${item.item.image}`}
                                                    alt={`productImage${item._id}`}
                                                    className="productImage" /></td>
                                            <td width="30%">
                                                <div>
                                                    <h4>{item.item.product_name}</h4>
                                                    <p>color: black</p>
                                                    <p>size: small</p>
                                                </div>
                                            </td>
                                            <td width="10%">
                                                <Input
                                                    type="number"
                                                    name="quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => this._handleQuantityChange(e, item.item, item.quantity)} />
                                            </td>
                                            <td width="10%">{`$${item.item.unitprice}`}</td>
                                            <td width="25%">{`$${(item.quantity * item.item.unitprice)}`}</td>
                                            <td>
                                                <Button color="danger" onClick={() => this._handleRemoveItemFromCart(item.item._id)}>X</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><b>SUBTOTAL</b></td>
                                    <td>{
                                        this.state.cartItems.length > 0 ?
                                            `$${(this.state.cartItems.reduce((s, i) => s + (i.item.unitprice * i.quantity), 0))}`
                                            : 0
                                    }</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><b>SHOPPING FEE</b></td>
                                    <td>{`$${15}`}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><b>GRANDTOTAL</b></td>
                                    <td>{
                                        this.state.cartItems.length > 0 ?
                                            `$${(this.state.cartItems.reduce((s, i) => s + (i.item.unitprice * i.quantity), 0)) + 15}`
                                            : 0
                                    }</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Button color="danger" onClick={this._handleContinueShoppingCart}>Continue Shopping</Button>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td colspan="2" style={{ textAlign: 'left' }}>
                                        <Button color="success" onClick={this._handleCheckout}>Checkout</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        : <div style={{ textAlign: 'center' }}>
                            <p>No Items cart. Please add items.</p>
                            <Button color="success" onClick={this._handleContinueShoppingCart}>Back to Items</Button>
                        </div>
                    }

                    <Modal
                        isOpen={this.state.checkoutSuccessModal}
                        size="md"
                    >
                        <ModalHeader>Checkout Success</ModalHeader>
                        <ModalBody>
                            <Alert color="success">
                                Your payment done successfully.
                                Thank you for shopping with us.
                                Please provide your feedback and continue shoping with us.
                            </Alert>
                        </ModalBody>
                    </Modal>
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(OrderCart);
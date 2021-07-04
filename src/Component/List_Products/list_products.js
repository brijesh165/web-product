import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    Container, Row, Col, Label, Button, Alert,
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import './list_products.css';

import * as actions from './../../store/actions/index';
import Header from './../Header/header';

class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createProductForm: false,
            addItemToCartModal: false,
            form: {
                productname: "",
                productdescription: "",
                quantity: "",
                unitprice: "",
                productimage: null
            },
            isEdit: false,
            editProductId: "",
        }

        this._handleCreateProduct = this._handleCreateProduct.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this);
        this._onResetForm = this._onResetForm.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._onCancelClick = this._onCancelClick.bind(this);
        this._handleAddCart = this._handleAddCart.bind(this);
        this._handleImageClick = this._handleImageClick.bind(this);
        this._handleEditItem = this._handleEditItem.bind(this);
        this._handleDeleteItem = this._handleDeleteItem.bind(this);
    }

    _handleCreateProduct() {
        this.setState({
            createProductForm: !this.state.createProductForm
        })
    }

    _onResetForm() {
        this.setState({
            form: {
                productname: "",
                productdescription: "",
                quantity: "",
                unitprice: "",
                productimage: null
            }
        })
    }

    _handleOnChange(event) {
        event.preventDefault();
        const { name, value } = event.target;

        if (name === "productimage") {
            this.setState({
                form: {
                    ...this.state.form,
                    productimage: event.target.files[0]
                }
            })
        } else {
            this.setState({
                form: {
                    ...this.state.form,
                    [name]: value
                }
            })
        }
    }

    _onFormSubmit(event) {
        event.preventDefault();
        if (this.state.isEdit) {
            const params = {
                id: this.state.editProductId,
                form: this.state.form
            }
            this.props.onEdit(params)
        } else {
            this.props.onCreate(this.state.form);
        }

        if (!this.props._loading) {
            this.setState({
                createProductForm: !this.state.createProductForm
            })
        }
    }

    _onCancelClick(event) {
        event.preventDefault();
        this.setState({
            createProductForm: false,
            isEdit: false,
            editProductId: ""
        })
        this._onResetForm();
    }

    _handleImageClick(item) {
        this.props.history.push({
            pathname: "/product-details",
            state: item
        })
    }

    _handleAddCart(item) {
        if (localStorage.getItem('cartItems')) {
            const previousCartItems = JSON.parse(localStorage.getItem('cartItems'));
            const itemExist = previousCartItems.find((product) => product.item._id === item._id);
            if (itemExist) {
                itemExist.quantity++;
                localStorage.setItem('cartItems', JSON.stringify(previousCartItems));
                this.setState({
                    addItemToCartModal: true
                })

                setTimeout(() => {
                    this.setState({
                        addItemToCartModal: false
                    })
                }, 1000);
            } else {
                const newItem = {
                    item: item,
                    quantity: 1
                }
                const addNewItemInCard = [...previousCartItems, newItem]
                localStorage.setItem('cartItems', JSON.stringify(addNewItemInCard));

                this.setState({
                    addItemToCartModal: true
                })

                setTimeout(() => {
                    this.setState({
                        addItemToCartModal: false
                    })
                }, 1000);
            }
        } else {
            const cartItems = [];
            const product = {
                item: item,
                quantity: 1
            }
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems))

            this.setState({
                addItemToCartModal: true
            })

            setTimeout(() => {
                this.setState({
                    addItemToCartModal: false
                })
            }, 1000);
        }
    }

    _handleEditItem(item) {
        console.log("Edit Item: ", item)
        this.setState({
            createProductForm: true,
            isEdit: true,
            editProductId: item._id,
            form: {
                productname: item.product_name,
                productdescription: item.product_description,
                quantity: item.quantity,
                unitprice: item.unitprice,
                productimage: item.image.split("-")[1]
            }
        })
    }

    _handleDeleteItem(id, imagepath) {
        const deleteParams = {
            id: id,
            imagepath: imagepath
        }
        this.props.onDelete(deleteParams);
    }

    getProducts() {
        this.props.onFetch();
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Container className="mt-4">
                    <Row className="createProduct">
                        <Button color="success" className="createProductButton" onClick={this._handleCreateProduct}>
                            <FontAwesomeIcon icon={faPlus} />
                            &nbsp; Create Meeting</Button>

                        <AvForm
                            className={!this.state.createProductForm ? 'hidden' : 'createProductForm'}
                            onValidSubmit={this._onFormSubmit}>
                            <AvGroup row>
                                <Label for="productname" lg={2}>Product Name</Label>
                                <Col lg={10}>
                                    <AvField name="productname"
                                        type="text"
                                        id="productname"
                                        value={this.state.form.productname}
                                        onChange={this._handleOnChange}
                                        validate={{
                                            required: { value: true, errorMessage: "Please enter Product Name." }
                                        }}
                                    />
                                </Col>
                            </AvGroup>
                            <AvGroup row>
                                <Label for="produproductdescriptionctname" lg={2}>Product Description</Label>
                                <Col lg={10}>
                                    <AvField
                                        type="textarea"
                                        name="productdescription"
                                        id="productdescription"
                                        value={this.state.form.productdescription}
                                        onChange={this._handleOnChange}
                                        validate={{
                                            required: { value: true, errorMessage: "Please enter Product Description." }
                                        }}
                                    />
                                </Col>
                            </AvGroup>
                            <AvGroup row>
                                <Label for="quantity" lg={2}>Quantity</Label>
                                <Col lg={10}>
                                    <AvField
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        onChange={this._handleOnChange}
                                        value={this.state.form.quantity}
                                        validate={{
                                            required: { value: true, errorMessage: "Please enter Product Quantity." }
                                        }} />
                                </Col>
                            </AvGroup>
                            <AvGroup row>
                                <Label for="unitprice" lg={2}>Unit Price</Label>
                                <Col lg={10}>
                                    <AvField type="number"
                                        name="unitprice"
                                        id="unitprice"
                                        onChange={this._handleOnChange}
                                        value={this.state.form.unitprice}
                                        validate={{
                                            required: { value: true, errorMessage: "Please enter Unit Price." }
                                        }} />
                                </Col>
                            </AvGroup>
                            <AvGroup row>
                                <Label for="productimage" lg={2}>Product Image</Label>
                                <Col lg={10}>
                                    <AvField
                                        type="file"
                                        name="productimage"
                                        id="productimage"
                                        accept="image/png, image/jpeg"
                                        value={this.state.productimage}
                                        onChange={this._handleOnChange}
                                        validate={{
                                            required: { value: true, errorMessage: "Please select image for product." }
                                        }} />
                                </Col>
                            </AvGroup>

                            <AvGroup row className="formButtons">
                                <Button color="success" style={{ marginRight: "10px" }} type="submit">Submit</Button>
                                <Button color="danger" onClick={this._onCancelClick}>Cancel</Button>
                            </AvGroup>
                        </AvForm>
                    </Row>

                    <Row className="mt-4">
                        {this.props._productList.length > 0 &&
                            this.props._productList.map((item) => {
                                return (
                                    <Row className="mt-4" key={item._id} style={{ 'marginBottom': '20px' }}>
                                        <div className="col-md-4">
                                            <img src={`http://localhost:3001/${item.image}`}
                                                className="productImage"
                                                alt={`product image${item._id}`}
                                                onClick={() => this._handleImageClick(item)} />
                                        </div>
                                        <div className="col-md-8 text-left">
                                            <h5>{item.product_name}</h5>
                                            <p>{item.product_description}</p>
                                            <h3>{`$${item.unitprice}`}</h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button color="success" onClick={() => this._handleAddCart(item)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    &nbsp;ADD CART
                                                </Button>
                                                <Button color="primary" onClick={() => this._handleEditItem(item)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                    &nbsp;Edit
                                                </Button>
                                                <Button color="danger" onClick={() => this._handleDeleteItem(item._id, item.image)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    &nbsp;DELETE
                                                </Button>
                                            </div>
                                        </div>
                                    </Row>)
                            })
                        }
                    </Row>

                    <Modal
                        isOpen={this.state.addItemToCartModal}
                        size="md"
                    >
                        <ModalHeader>Checkout Success</ModalHeader>
                        <ModalBody>
                            <Alert color="success">
                                Item added to cart successfully.
                            </Alert>
                        </ModalBody>
                    </Modal>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _loading: state.products.loading,
        _productList: state.products.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (params) => dispatch(actions.oncreateproduct(params)),
        onFetch: () => dispatch(actions.onFetchProducts()),
        onEdit: (params) => dispatch(actions.onEditproduct(params)),
        onDelete: (params) => dispatch(actions.onDeleteproduct(params)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListProducts));
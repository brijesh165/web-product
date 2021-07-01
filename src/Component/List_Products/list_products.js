import React from 'react';

import axios from 'axios';
import FormData from 'form-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    Container, Row, Col, Label, Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import './list_products.css';
import icon from './../../assets/icon.png';

import Header from './../Header/header';

class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createProductForm: false,
            form: {
                productname: "",
                productdescription: "",
                quantity: "",
                unitprice: "",
                productimage: null
            }

        }

        this._handleCreateProduct = this._handleCreateProduct.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this);
        this._onResetForm = this._onResetForm.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
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
            console.log(event.target.files[0])
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
        console.log("Image: ", this.state.productimage)
        let data = new FormData();
        data.append('product_name', this.state.productname);
        data.append('product_description', this.state.productdescription);
        data.append('quantity', this.state.quantity);
        data.append('unitprice', this.state.unitprice);
        data.append('image', this.state.productimage, this.state.productimage.name);

        axios.post("http://localhost:3001/create-product", data)
            .then((data) => {
                console.log("Data: ", data);
            })
            .catch((error) => {
                console.log("Error: ", error)
            })
    }

    _onCancelClick(event) {
        event.preventDefault();
        this._onResetForm();
        this.setState({
            createProductForm: !this.state.createProductForm
        })
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

                    <Row className="mt-2">
                        <Card>
                            <CardImg top className="mr-2" width="10%" src={icon} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         _listMeetings: state.meetings.allMeetings
//     }
// }


export default ListProducts;
import axios from 'axios';
import FormData from 'form-data';
import * as actionTypes from './actionTypes';

const api = "http://localhost:3001";

const config = {
    headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
    }
}

export function createProductStart() {
    return {
        type: actionTypes.CREATE_PRODUCT_START
    }
}
export function createProductSuccess(params) {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        payload: params
    }
}
export function createProductFail(error) {
    return {
        type: actionTypes.CREATE_PRODUCT_FAIL,
        payload: error
    }
}

export function fetchProductStart() {
    return {
        type: actionTypes.FETCH_PRODUCT_START
    }
}
export function fetchProductSuccess(params) {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        payload: params
    }
}
export function fetchProductFail(error) {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        payload: error
    }
}

export function editProductStart() {
    return {
        type: actionTypes.EDIT_PRODUCT_START
    }
}
export function editProductSuccess(params) {
    return {
        type: actionTypes.EDIT_PRODUCT_SUCCESS,
        payload: params
    }
}
export function editProductFail(error) {
    return {
        type: actionTypes.EDIT_PRODUCT_FAIL,
        payload: error
    }
}

export function deleteProductStart() {
    return {
        type: actionTypes.DELETE_PRODUCT_START
    }
}
export function deleteProductSuccess(params) {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        payload: params
    }
}
export function deletetProductFail(error) {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        payload: error
    }
}

export function oncreateproduct(params) {
    return dispatch => {
        dispatch(createProductStart())

        let data = new FormData();
        data.append('product_name', params.form.productname);
        data.append('product_description', params.form.productdescription);
        data.append('quantity', params.form.quantity);
        data.append('unitprice', params.form.unitprice);
        data.append('image', params.form.productimage, params.form.productimage.name);

        // api end point for create product
        axios.post(`${api}/create-product`, data, config)
            .then((data) => {
                dispatch(createProductSuccess(data.data.product))
            })
            .catch((error) => {
                console.log("Error: ", error)
                dispatch(createProductFail(error))
            })
    }
}

export function onFetchProducts() {
    return dispatch => {
        dispatch(fetchProductStart());

        // api end point to get the product
        axios.post(`${api}/fetch-products`)
            .then((data) => {
                dispatch(fetchProductSuccess(data.data.products))
            })
            .catch((error) => {
                console.log("Fetch Product Error: ", error);
                dispatch(fetchProductFail(error))
            })
    }
}

export function onEditproduct(params) {
    return dispatch => {
        dispatch(editProductStart());
        let data = new FormData();

        data.append('_id', params.id)
        data.append('product_name', params.form.productname);
        data.append('product_description', params.form.productdescription);
        data.append('quantity', params.form.quantity);
        data.append('unitprice', params.form.unitprice);
        data.append('image', params.form.productimage, params.form.productimage.name);

        // api end point to edit the product
        axios.post(`${api}/edit-product`, data, config)
            .then((data) => {
                dispatch(editProductSuccess(data.data.product))
            })
            .catch((error) => {
                dispatch(editProductFail(error))
                console.log("Edit Product Error: ", error)
            })
    }
}

export function onDeleteproduct(params) {
    return dispatch => {
        dispatch(deleteProductStart());
        // api end point to delete the product
        axios.post(`${api}/delete-product`, params)
            .then((data) => {
                dispatch(deleteProductSuccess(data.data.id))
            })
            .catch((error) => {
                dispatch(deletetProductFail(error))
                console.log("Delete Product Error: ", error)
            })
    }
}
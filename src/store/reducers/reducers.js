import { combineReducers } from 'redux';

import products_reducer from './productsReducer';

const rootReducer = combineReducers({
    products: products_reducer
})

export default rootReducer;

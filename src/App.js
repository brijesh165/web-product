import { Switch, Route } from 'react-router-dom';

import './App.css';
import ListProducts from './Component/List_Products/list_products';
import ProductDetails from './Component/Product_Details/product_Details';
import OrderCart from './Component/Order_Cart/order_cart';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => (
          <ListProducts />
        )} />

        <Route path="/product-details" render={() => (
          <withAuth>
            <ProductDetails />
          </withAuth>
        )} />

        <Route path="/order-cart" render={() => (
          <OrderCart />
        )} />

      </Switch>
    </div>
  );
}

export default App;

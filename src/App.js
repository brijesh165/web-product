import { Switch, Route } from 'react-router-dom';

import './App.css';
import ListProducts from './Component/List_Products/list_products';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => (
          <ListProducts />
        )} />
      </Switch>
    </div>
  );
}

export default App;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Loading from './components/Loading';
import './App.scss';
import ToastContainer from './components/ToastContainer';

// Dynamic Imports

const ProductsList = React.lazy(() =>
  import('./components/Products/ProductsList')
);
const Wishlist = React.lazy(() => import('./components/Wishlist/Wishlist'));

const ProductDetails = React.lazy(() =>
  import('./components/ProductDetails/ProductDetails')
);

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer />
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path="/" component={ProductsList} />
            <Route exact path="/Product/:id" component={ProductDetails} />
            <Route exact path="/Wishlist" component={Wishlist} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

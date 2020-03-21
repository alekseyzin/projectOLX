import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import history from './history'
import {composeWithDevTools} from 'redux-devtools-extension'

import 'materialize-css/dist/css/materialize.min.css'
import './App.css';


import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
// import Goods from './Components/Goods/Goods';
// import GoodsCard from './Components/GoodCard/GoodsCard';
import Authorization from './Components/Authorization/Authorization';
import Registration from './Components/Registration/Registration';
import rootReducer from './store/rootReducer';
import rootSaga from './store/rootSaga';


const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Router history={history}>
          <Header />
          <main>
            <div className="container">
              <Switch>
                {/* <Redirect exact from="/" to="/user1" /> */}
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/goods" component={Goods} /> */}
                {/* <Route exact path="/goodsCard" component={GoodsCard} /> */}
                <Route exact path="/authorization" component={Authorization} />
                <Route exact path="/registration" component={Registration} />
              </Switch>
            </div>
          </main>
          <Footer />
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;

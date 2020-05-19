import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
// import M from 'materialize-css'

import 'materialize-css/dist/css/materialize.min.css'
import './App.css';

import history from './history'
import rootReducer from './store/rootReducer';
import rootSaga from './store/rootSaga';
import Routes from './Routes';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Bread from './Components/Breadcrumbs/Bread';


const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware)))

sagaMiddleware.run(rootSaga)

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header />
        <main>
          <div className="container">
            <Bread />
            <Routes />
          </div>
        </main>
        <Footer />
      </ConnectedRouter>
    </Provider>
  );
}

export default React.memo(App);

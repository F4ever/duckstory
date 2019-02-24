import 'babel-polyfill';
import 'whatwg-fetch';
// --------- React -----------------
import React from 'react';
import reducers from './reducers';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from "redux-devtools-extension";
// ----------- Components --------------
import Index from "./components";
import Header from "./components/header";
import Footer from "./components/footer";


const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers(reducers), composeWithDevTools(applyMiddleware(middleware))
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="main-container">
        <Header/>
        <Switch>
          <Route exact path="/" component={Index}/>
        </Switch>
        <Footer/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

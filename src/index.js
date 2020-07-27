import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/';
import * as serviceWorker from './serviceWorker';
import storeFactory from './store';

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    {}

const saveState = () => {
  localStorage["redux-store"] = JSON.stringify(store.getState());
}

const store = storeFactory(initialState);
store.subscribe(saveState);

serviceWorker.unregister();

window.React = React
window.store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
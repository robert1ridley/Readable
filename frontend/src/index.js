import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import categoryReducer from './Reducers/categoryReducer';
import './index.css';
import App from './App';

const logger = createLogger();
const store = createStore(
  categoryReducer,
  applyMiddleware(thunk, promise, logger)
);

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import reducers from './reducers';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.querySelector('#root')
);
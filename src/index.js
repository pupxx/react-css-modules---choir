import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import './index.css';
import App from './components/app/App';
import About from './components/about/About';
import registerServiceWorker from './registerServiceWorker';
import reducers from './store/reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

const app = (
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
        <div>
            <Route path="/" component={App}/>
        </div>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.querySelector('#root'));
registerServiceWorker();

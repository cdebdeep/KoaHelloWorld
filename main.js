import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'

/*import App from './App.jsx';
import TodoCollection from './Todo.jsx'*/

import allReducers from './reducers/index'
import App from './components/app';

const store =createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));
import React, { Component } from 'react';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers';
// import firebase from 'firebase';
// import LoginForm from './components/LoginForm';
import ReduxThunk from 'redux-thunk';
// import AppRouter from './Router';

class App extends Component {

    render() {
        const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
    }
}

export default App;
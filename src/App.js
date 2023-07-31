import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import EditUser from './components/Home/EditUser/EditUser';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <BrowserRouter>
            <ToastContainer></ToastContainer>
            <Switch>
                <Route path='/auth' component={Auth} exact />
                <Route path='/user' component={Home} />
                <Route path='/' component={Auth} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

import React, { useState } from 'react';
import './Auth.css';

// Images
import LoginImg from '../../assets/images/login.svg';
import RegisterImg from '../../assets/images/register.svg';

// Compnents
import Button from '../UI/Button/Button';
import Register from './Login/Login';
import Login from './Register/Register';

const Auth = () => {
    // States
    const [showSignUp, setSignUp] = useState(false);

    const toggleSignup = () => {
        setSignUp(!showSignUp);
    };

    return (
        <div className={`container ${showSignUp ? 'sign-up-mode' : ''}`}>
            <div className='forms-container'>
                <div className='sigin-signup'>
                    <Register />

                    <Login />
                </div>
            </div>

            <div className='panels-container'>
                <div className='panel left-panel'>
                    <div className='content'>
                        <h3>New here?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam odio eligendi quisquam?</p>
                        <Button type='button' value='Sign up' classesArr={['transparent']} id='sign-up-btn' clickHandler={toggleSignup} />
                    </div>

                    <img src={LoginImg} alt='Login' className='image' />
                </div>

                <div className='panel right-panel'>
                    <div className='content'>
                        <h3>One of us?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam odio eligendi quisquam?</p>
                        <Button type='button' value='Sign in' classesArr={['transparent']} id='sign-in-btn' clickHandler={toggleSignup} />
                    </div>

                    <img src={RegisterImg} alt='Login' className='image' />
                </div>
            </div>
        </div>
    );
};

export default Auth;

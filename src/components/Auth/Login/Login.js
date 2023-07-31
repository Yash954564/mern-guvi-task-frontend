import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import axios from '../../../axios';

import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';


// Components
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';

import { useDispatch } from 'react-redux'; //redux
import { login } from '../../../store/actions/index'; //login action of redux

const Login = () => {
    // Access Redux States, actions
    const dispatch = useDispatch();

    let history = useHistory();

    const [values, setValues] = useState({
        email: '',
        password: '',
    }); // Text fields
    const [errors, setErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);

    // Text Input Change Handler
    function textInputHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const loginFormHandler = (e) => {
        e.preventDefault();
        setShowLoader(true);

        axios
            .post('/auth/login', values)
            .then(function (response) {
                setShowLoader(false);

                if (Object.keys(response.data.errors).length > 0) {
                    setErrors(response.data.errors);
                } else {
                    toast.success('🚀 Login Successfull', { position: 'top-center' });

                    // Redux action
                    dispatch(login(response.data.user, response.data.token));

                    const userId = response.data.user.id;
                    history.push('/user/' + userId);
                }
            })
            .catch(function (error) {
                setShowLoader(false);
                setErrors({ ...errors, failure: error.message });
            });
    };

    return (
        <form className='sign-in-form' onSubmit={loginFormHandler}>
            <h2 className='title'>Sign in</h2>

            {Object.keys(errors).length > 0 && (
                <div className='form__errors'>
                    <ul className='errors-ul'>
                        {Object.values(errors).map((value, i) => (
                            <li key={i}>*{value}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className='input-field'>
                <MailIcon />
                <input type='email' name='email' placeholder='Email' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <LockIcon />
                <input type='password' name='password' placeholder='Password' onChange={textInputHandler} />
            </div>

            {showLoader ? <Loader /> : <Button type='submit' value='Login' classesArr={['solid']} />}

          
        </form>
    );
};

export default Login;

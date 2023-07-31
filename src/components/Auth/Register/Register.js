import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import axios from '../../../axios';
import { toast } from 'react-toastify';

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import MailIcon from '@material-ui/icons/Mail';

import AvatarImg from '../../../assets/images/avatar.svg';

import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';

import { useDispatch } from 'react-redux'; //redux
import { login } from '../../../store/actions/index'; //login action of redux

const Register = () => {
    // Access Redux States, actions
    const dispatch = useDispatch();

    let history = useHistory();

    // States
    const [showLoader, setShowLoader] = useState(false);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }); // text fields

    const [errors, setErrors] = useState({});

    // Text Input Change Handler
    function textInputHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    // Form Handlers
    const signupFormHandler = (e) => {
        e.preventDefault();
        setShowLoader(true);

       
        const formData = new FormData(); 
        Object.keys(values).forEach(function (key) {
            formData.append(key, values[key]);
        });

        axios
            .post('/auth/register', formData)
            .then(function (response) {
                setShowLoader(false);

                if (Object.keys(response.data.errors).length > 0) {
                    setErrors(response.data.errors);
                } else {
                    toast.success('🚀 Registration Successful', { position: 'top-center' });

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
        <form className='sign-up-form' onSubmit={signupFormHandler} encType='multipart/form-data'>
            <h2 className='title'>Sign up</h2>
            {/* <div className='avatar-info'>
                <img src={AvatarImg} alt='Profile Pic' />
            </div>

            {Object.keys(errors).length > 0 && (
                <div className='form__errors'>
                    <ul className='errors-ul'>
                        {Object.values(errors).map((value, i) => (
                            <li key={i}>*{value}</li>
                        ))}
                    </ul>
                </div>
            )} */}

            <div className='input-field'>
                <FaceIcon />
                <input type='text' name='name' placeholder='Name' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <MailIcon />
                <input type='email' name='email' placeholder='Email' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <LockIcon />
                <input type='password' name='password' placeholder='Password' onChange={textInputHandler} />
            </div>
            <div className='input-field'>
                <LockIcon />
                <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={textInputHandler} />
            </div>

            {showLoader ? <Loader /> : <Button type='submit' value='Sign up' classesArr={['solid']} />}
        </form>
    );
};

export default Register;

import React, { useRef, useState } from 'react';
import './EditUser.css';
import axios, { SERVER_URL } from '../../../axios';
import { toast } from 'react-toastify';

import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';

import ProfileImg from '../../../assets/images/test.jpg';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import FaceIcon from '@material-ui/icons/Face';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WcIcon from '@material-ui/icons/Wc';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneIcon from '@material-ui/icons/Phone';

import { useSelector, useDispatch } from 'react-redux'; //redux
import { login } from '../../../store/actions/index'; //login action of redux

const EditUser = ({ clickHandler, user }) => {
    // Access Redux State
    const auth = useSelector((state) => state);
    const dispatch = useDispatch();

    const [currentProfilePic, setCurrentProfilePic] = useState(`${SERVER_URL}/${user.profilePic}`);
    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        password: '',
        newPassword: '',
        age: user.age || '',
        gender: user.gender || '',
        dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : '',
        mobile: user.mobile || '',
    }); //textfields
    const [errors, setErrors] = useState({});
    const [imageFileObj, setImageFileObj] = useState({});
    const [showLoader, setShowLoader] = useState(false);

    const inputFile = useRef(null);

    const showInputDialog = () => {
        inputFile.current.click();
    };

    const fileDialogChange = (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            // change src of profilePic
            const profilePic = files[0];

            var oFReader = new FileReader();
            oFReader.readAsDataURL(profilePic);
            oFReader.onload = function (oFREvent) {
                setCurrentProfilePic(oFREvent.target.result);
            };
            setImageFileObj(profilePic); //save as file object
        } else {
            setCurrentProfilePic(ProfileImg);
            setImageFileObj({});
        }
    };

    // Text Input Change Handler
    function textInputHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const updateFormHandler = (e) => {
        e.preventDefault();
        setShowLoader(true);

        const formData = new FormData(); //Needed to post files
        formData.append('updateProfilePic', imageFileObj);
        formData.append('id', auth.user.id); //Dynamic Id from state
        formData.append('token', auth.token); //Dynamic Id from state

        Object.keys(values).forEach(function (key) {
            formData.append(key, values[key]);
        });

        axios
            .post('/user/updateUser', formData)
            .then(function (response) {
                setShowLoader(false);

                if (Object.keys(response.data.errors).length > 0) {
                    setErrors(response.data.errors);
                } else {
                    dispatch(login(response.data.user, auth.token));
                    toast.success('🚀 Profile Updated Successfully', { position: 'top-center' });
                }
            })
            .catch(function (error) {
                setShowLoader(false);

                setErrors({ ...errors, failure: error.message });
            });
    };

    return (
        <>
            <div className='user-content'>
                <div className='user-details'>
                    <div className='user-picture edit-user'>
                        <img src={currentProfilePic} alt='' className='user-image' />
                        <div className='overlay'>
                            <Button
                                type='submit'
                                value='Change'
                                classesArr={['small', 'overlay-btn', 'transparent']}
                                clickHandler={showInputDialog}
                            />
                        </div>
                    </div>
                    <div className='user-data'>
                        <form className='update-user-form' onSubmit={updateFormHandler} encType='multipart/form-data'>
                            <input type='file' name='updateProfilePic' ref={inputFile} onChange={fileDialogChange} style={{ display: 'none' }} />

                            <h2 className='title'>Edit Details</h2>

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
                                <FaceIcon />
                                <input type='text' name='name' placeholder='Name' onChange={textInputHandler} defaultValue={user.name} />
                            </div>
                            <div className='input-field'>
                                <MailIcon />
                                <input type='email' name='email' placeholder='Email' onChange={textInputHandler} defaultValue={user.email} />
                            </div>
                            <div className='input-field'>
                                <LockIcon />
                                <input type='password' name='password' placeholder='Old Password' onChange={textInputHandler} />
                            </div>
                            <div className='input-field'>
                                <EnhancedEncryptionIcon />
                                <input type='password' name='newPassword' placeholder='New Password' onChange={textInputHandler} />
                            </div>
                            <div className='input-field'>
                                <AccountCircleIcon />
                                <input type='number' name='age' placeholder='Age' onChange={textInputHandler} defaultValue={user.age} />
                            </div>
                            <div className='input-field'>
                                <WcIcon />
                                <input type='text' name='gender' placeholder='Gender' onChange={textInputHandler} defaultValue={user.gender} />
                            </div>
                            <div className='input-field'>
                                <CakeIcon />
                                <input type='date' name='dob' placeholder='Date of Birth' onChange={textInputHandler} defaultValue={values.dob} />
                            </div>
                            <div className='input-field'>
                                <PhoneIcon />
                                <input type='text' name='mobile' placeholder='Mobile' onChange={textInputHandler} defaultValue={user.mobile} />
                            </div>

                            <div className='user-btns'>
                                {showLoader ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <Button type='button' value='Back' classesArr={['solid']} clickHandler={clickHandler} />
                                        <Button type='submit' value='Update' classesArr={['solid']} />
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUser;

import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WcIcon from '@material-ui/icons/Wc';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneIcon from '@material-ui/icons/Phone';

import Button from '../../UI/Button/Button';
import { SERVER_URL } from '../../../axios';

const ShowUser = ({ clickHandler, user }) => {
    return (
        <div className='user-content'>
            <div className='user-details'>
                <div className='user-picture'>
                    <img src={`${SERVER_URL}/${user.profilePic}`} alt='' className='user-image' />
                </div>
                <div className='user-data'>
                <Button type='button' value='Edit Details' classesArr={['solid']} id='sign-up-btn' clickHandler={clickHandler} />
                
                    <h2>{user.name}</h2>

                    <div className='email-address'>
                        <MailIcon fontSize='large' />
                        <h3>{user.email}</h3>
                    </div>

                    <div className='email-address'>
                        
                        <h3>{user.username}</h3>
                    </div>

                    
                        <div className='email-address'>
                            <AccountCircleIcon fontSize='large' />
                            <h3>Age: {user.age}</h3>
                        </div>
                        <div className='email-address'>
                            <WcIcon fontSize='large' />
                            <h3>Gender: {user.gender}</h3>
                        </div>
                        <div className='email-address'>
                            <CakeIcon fontSize='large' />
                            <h3>Date of Birth: {user.dob}</h3>
                        </div>
                        <div className='email-address'>
                            <PhoneIcon fontSize='large' />
                            <h3>Mobile: {user.mobile}</h3>
                        </div>
                    

                    
                    
                </div>
            </div>
        </div>
    );
};

export default ShowUser;

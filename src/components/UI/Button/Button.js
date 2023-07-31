import React from 'react';
import './Button.css';

const Button = ({ type, value, classesArr, id, clickHandler }) => {
    return (
        <input
            type={type}
            value={value}
            className={`btn ${classesArr.join(' ')}`}
            id={id ? id : undefined}
            onClick={clickHandler ? clickHandler : undefined}
        />
    );
};

export default Button;

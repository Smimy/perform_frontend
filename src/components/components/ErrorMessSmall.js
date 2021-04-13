import React from 'react';

const ErrorMessSmall = ({ message, right, left }) => (
    <small 
        style={{ marginTop:'-20px' }} 
        className={
            `text-danger 
            ${right ? 'float-right': '' } 
            ${left ? 'float-left' : ''}`
        }
    >
        {message}
    </small>
);

export default ErrorMessSmall;
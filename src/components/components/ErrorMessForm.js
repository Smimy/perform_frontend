import React from 'react';
import ErrorMessSmall from './ErrorMessSmall';

const ErrorMessForm = ({ error, touched, ...rest }) => {
    if( error && touched ) 
        return <ErrorMessSmall {...rest} message={error} />
    else 
        return null;
};

export default ErrorMessForm;
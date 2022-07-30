import React from 'react';

const ErrorCaption = ({dataError}) => {
    return (
        <div className="invalid-feedback has-error-text">
            {dataError}
        </div>
    )
}

export default ErrorCaption;
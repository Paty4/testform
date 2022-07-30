import React from 'react';

const SendMessageCaption = ({ message, addingClass }) => {
    return (
        <div className={`invalid-feedback has-text ${addingClass}`}>
            {message}
        </div>
    )
}

export default SendMessageCaption;
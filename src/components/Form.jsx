import React, { useReducer, useState } from 'react';
import InputExt from './InputExt';
import * as listValidators from './../constants/listValidators.js'
import { initStateForm, reducerForm } from '../services/formReducer';
import * as actions from './../constants/actionFormList.js';
import ErrorCaption from './ErrorCaption';
import { sendFormData } from '../services/connectionService';
import SendMessageCaption from './SendMessageCaption';

const Form = () => {
    const [stateForm, dispatch] = useReducer(reducerForm, initStateForm);
    const [isValidForm, setIsValidForm] = useState(true);
    const [stausQuery, setStatusQuery] = useState(null);
    const [messageQuery, setMessageQuery] = useState('');
    const [isSend, setIsSend] = useState(false);

    const updateStateElement = action => {
        if (!isValidForm) setIsValidForm(true);
        dispatch(action);
    }

    const sendAction = (action, value) => {
        action.value = value;
        updateStateElement(action);
    }

    const validationAllField = () => {
        let result = true;

        Object.keys(stateForm).forEach(key => {
            let resultValidator = '';
            const validators = listValidators[key] && listValidators[key].validatorsFout ? listValidators[key].validatorsFout : [];
            for (let i = 0; i < validators.length; i++) {
                resultValidator = validators[i](stateForm[key].value);
                if (resultValidator) {
                    let action = actions.actionValid(key);
                    sendAction(action, false);
                    action = actions.actionTouch(key);
                    sendAction(action, true);
                    action = actions.actionError(key);
                    sendAction(action, resultValidator);
                    result = false;
                    break;
                }
            }
        });

        return result;
    }

    const clearForm=()=>{
        let action = undefined;
        Object.keys(stateForm).forEach(key=>{
            action = actions.actionError(key);
            sendAction(action,'');
            action = actions.actionValue(key);
            sendAction(action,'');
            action = actions.actionValid(key);
            sendAction(action,true);
            action = actions.actionTouch(key);
            sendAction(action,false);
        });
    }

    const hideMessage=()=>{
        setMessageQuery('');
        setStatusQuery('');
    }

    const handlerSubmit = async e => {
        e.preventDefault();
        setIsValidForm(true);
        const isValid = validationAllField();
        setIsValidForm(isValid);
        if (isValid) {
            setIsSend(true);
            const formData = {};
            Object.keys(stateForm).forEach(key => {
                formData[key] = stateForm[key].value;
            });
            let result = await sendFormData(formData, 'normal1');
            setStatusQuery(result.status);
            setMessageQuery(result.message);
            if (result.status==='success') clearForm();
            setIsSend(false);
            setTimeout(hideMessage,5000);
        }
    }

    return (
        <form className='testForm' onSubmit={handlerSubmit}>
            <InputExt
                key='fullName'
                name='fullName'
                userOptions={{
                    caption: 'Имя Фамилия',
                    isUpperCase: true,
                }}
                statusElemnt={{
                    ...stateForm['fullName'],
                    updateStateElement
                }}
                validators={listValidators.fullName}
            />
            <InputExt
                key='email'
                name='email'
                userOptions={{
                    caption: 'E-mail',
                }}
                statusElemnt={{
                    ...stateForm['email'],
                    updateStateElement
                }}
                validators={listValidators.email}
            />
            <InputExt
                key='phone'
                name='phone'
                userOptions={{
                    caption: 'Номер телефона',
                    mask: 'phoneMask',
                }}
                statusElemnt={{
                    ...stateForm['phone'],
                    updateStateElement
                }}
                validators={listValidators.phone}

            />
            <InputExt
                key='birthday'
                name='birthday'
                type='date'
                userOptions={{
                    caption: 'Дата рождения',
                }}
                statusElemnt={{
                    ...stateForm['birthday'],
                    updateStateElement
                }}
                validators={listValidators.birthday}
            />
            <InputExt
                key='message'
                name='message'
                userOptions={{
                    caption: 'Сообщение',
                    typeElement: 'textarea',
                }}
                statusElemnt={{
                    ...stateForm['message'],
                    updateStateElement
                }}
                validators={listValidators.message}
            />
            <div className='form-group'>
                <button disabled={isSend} className='btn btn-primary'>Отправить</button>
            </div>
            {!isValidForm ? <ErrorCaption dataError='Все поля не должны содержать ошибок!' /> : undefined}
            {stausQuery ?
                <SendMessageCaption
                    message={messageQuery}
                    addingClass={((typeClass) => {
                        switch (typeClass) {
                            case 'success':
                                return 'has-success-text';
                            case 'error':
                                return 'has-error-text';
                            default:
                                return '';
                                break;
                        }
                    })(stausQuery)}
                /> :
                undefined}
        </form>
    );
}

export default Form;
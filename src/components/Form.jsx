import React, { useReducer, useState } from 'react';
import InputExt from './InputExt';
import * as listValidators from './../constants/listValidators.js'
import { initStateForm, reducerForm } from '../services/formReducer';
import * as actions from './../constants/actionFormList.js';
import ErrorCaption from './ErrorCaption';

const Form = () => {
    const [stateForm, dispatch] = useReducer(reducerForm, initStateForm);
    const [isValidForm, setIsValidForm] = useState(true);

    const updateStateElement = action => {
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
            console.log(key);
        });
        
        return result;
    }

    const handlerSubmit = e => {
        e.preventDefault();
        setIsValidForm(true);
        const isValid = validationAllField();
        setIsValidForm(isValid);
        if (isValid) {
            alert('ok');
        } else {
            //alert('bad');
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
                <button className='btn btn-primary'>Отправить</button>
            </div>
            {!isValidForm ? <ErrorCaption dataError='Все поля не должны содержать ошибок!' /> : undefined}
        </form>
    );
}

export default Form;
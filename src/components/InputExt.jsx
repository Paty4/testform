/* 
Элемен ввода данных
Вход: 
    1. в пропс могут содержаться все стандартные атрибуты для input и textarea
    2. группа validators- объект содержаший 2а свойства 
        {
            validatorsFout: массив валидаторов которые будут исполняться при потере фокуса
            validatorsChange: массив валидаторов которые будут исполняться при изменении содержимого полей
        }
    3. группа userOptions - объект содержаший настройки элемента
        {
            caption: текст для label описания полей
            mask: маска ввода если требуется опционально
            isUpperCase: флаг ввода в верхнем регистре опционально
            typeElement: тип элемента (отслеживается пока только textarea, можно расширять) опционально
        }
    4. группа statusElemnt - объект значений и состояния управляемого элемента 
        {
            isValid: валидность объекта
            isTouch: попадал ли фокус на объект
            value: значение
            error: текст ошибки если имеется
            updateStateElement функция для обновления состояния на входе action
        }
 */
import React, { useEffect, useRef } from 'react';
import ErrorCaption from './ErrorCaption';
import * as constants from './../constants/formConsts.js';
import * as actions from './../constants/actionFormList.js';
import { getMaskData, positionCursor } from '../services/inputMask';

const InputExt = ({ name, validators, userOptions, statusElemnt, ...props }) => {
    const inputValue = useRef();
    const { validatorsFout, validatorsChange } = validators;
    const { caption, mask, isUpperCase, typeElement = 'input' } = userOptions;
    const { isValid, isTouch, value, error, updateStateElement } = statusElemnt;

    const actionValue = actions.actionValue(name);
    const actionTouch = actions.actionTouch(name);
    const actionValid = actions.actionValid(name);
    const actionError = actions.actionError(name);

    const sendAction = (action, value) => {
        action.value = value;
        updateStateElement(action);
    }

    const handelChange = () => {

        let dataValue = isUpperCase ? inputValue.current.value.toUpperCase() : inputValue.current.value;
        dataValue = dataValue.replace(/\s\s/, ' ');
        dataValue = getMaskData(dataValue, mask ? mask : null);

        validationElement(dataValue)(validatorsChange);
        sendAction(actionValue, dataValue);

    };

    useEffect(() => {
        if (mask) {
            switch (mask) {
                case 'phoneMask':
                    sendAction(actionValue, constants.MASK_PHONE);
                    break;
                default:
                    break;
            }
        }
    }, []);

    useEffect(() => {
        if (mask) {
            const position = positionCursor(value);
            inputValue.current.setSelectionRange(position, position);
        }
    }, [value]);

    const handelFocus = () => {
        sendAction(actionTouch, false);
    }

    const handelFocusOut = () => {
        validationElement(inputValue.current.value)(validatorsFout);
        sendAction(actionTouch, true);
    }

    const validationElement = verifyString => validators => {
        let resultValidator = '';
        sendAction(actionError, '');
        sendAction(actionValid, true);
        if (validators && Array.isArray(validators))
            for (let i = 0; i < validators.length; i++) {
                resultValidator = validators[i](verifyString);
                if (resultValidator) {
                    sendAction(actionValid, false);
                    sendAction(actionError, resultValidator);
                    break;
                }
            }

    }

    const createElement = element => {
        switch (element) {
            case 'textarea':
                return <textarea
                    name={name}
                    {...props}
                    className='form-control'
                    ref={inputValue}
                    onChange={handelChange}
                    onFocus={handelFocus}
                    onBlur={handelFocusOut}
                    value={value}
                />;
            default:
                return <input
                    name={name}
                    {...props}
                    className='form-control'
                    ref={inputValue}
                    onChange={handelChange}
                    onFocus={handelFocus}
                    onBlur={handelFocusOut}
                    value={value}
                />;
        }
    }

    return (

        <div className='form-group'>
            <div className={`form-group-ext${!isValid ? ' has-error' :
                isTouch ? ' has-success' : ''
                }`}>
                <label htmlFor={name}>{caption}</label>
                {createElement(typeElement)}
            </div>
            {!isValid ? <ErrorCaption dataError={error} /> : undefined}
        </div>
    )
}

export default InputExt;


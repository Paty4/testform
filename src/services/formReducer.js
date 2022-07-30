import * as constants from "./../constants/formConsts.js";

export const initStateForm = {
    fullName: {
        isTouch: false,
        isValid: true,
        value: '',
        error: '',
    },
    email: {
        isTouch: false,
        isValid: true,
        value: '',
        error: '',
    },
    phone: {
        isTouch: false,
        isValid: true,
        value: '',
        error: '',
    },
    birthday: {
        isTouch: false,
        isValid: true,
        value: '',
        error: '',
    },
    message: {
        isTouch: false,
        isValid: true,
        value: '',
        error: '',
    },
};

export const reducerForm = (state, action) => {
    return { ...getStateObject(state, action.type, action.nameElement, action.value) };
}

const getStateObject = (state, action, nameElement, value) => {
    const resultObj = { ...state };
    switch (action) {
        case 'setIsValid':
            resultObj[nameElement].isValid = value;
            break;
        case 'setIsTouch':
            resultObj[nameElement].isTouch = value;
            break;
        case 'setValue':
            resultObj[nameElement].value = nameElement === 'phone' && !value ? constants.MASK_PHONE : value;
            break;
        case 'setError':
            resultObj[nameElement].error = value;
            break;
        default:
            break;
    }
    return resultObj;
}
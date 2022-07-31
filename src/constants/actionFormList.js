/* 
    Сервис формирования action для dispatch, на входе имя элемента
 */
export const actionValid = nameElement => ({
    type: 'setIsValid',
    nameElement,
    value: false,
});

export const actionTouch = nameElement => ({
    type: 'setIsTouch',
    nameElement,
    value: false,
});

export const actionValue = nameElement => ({
    type: 'setValue',
    nameElement,
    value: '',
});

export const actionError = nameElement => ({
    type: 'setError',
    nameElement,
    value: '',
});
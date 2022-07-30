export const requaired = (dateMode=false) => value => {
    if (value) return false;
    return !dateMode? 'Поле не может быть пустым': 'Поле не может быть пустым или неверно введена дата';
}

export const requairedMask = valueMask => valueString => {
    return valueString && valueString !== valueMask ? false : 'Поле не может быть пустым';
}

export const maxLengthMessage = maxLength => valueString => {
    return valueString && valueString.length <= maxLength ? false : `Максисальная длина сообщения ${maxLength} символов`;
}

export const validPhone = valueMaskPhone => valueString => {
    const lengthCountryCode = valueMaskPhone.replace(/\D/g,'').length;
    const lenghtNumberPhone = valueMaskPhone.replace(/[^_]+/g,'').length;
    const lengthInputString = valueString.replace(/\D/g,'').length - lengthCountryCode;
    return lenghtNumberPhone === lengthInputString ? false : 'Неверно введен номер телефона';
}

export const countWords = (valueCount, strictMode = false) => valueString => {
    const words = getWord(valueString);
    if (!strictMode)
        return words.length > valueCount ? 'Поле должно содержать только два слова' : false;
    else
        return words.length !== valueCount ? 'Поле должно содержать только два слова' : false;
}

const getWord = valueString => {
    return valueString ? valueString.match(/[^\s]+/g) : [];
}

export const minSymbolInWord = minValue => valueString => {
    const words = getWord(valueString);
    const lengthWords = words.map(item => item.length).filter(item => item < minValue);
    return lengthWords.length > 0 ? `Слова должны содержить минимум ${minValue} символа(ов)` : false;
}

export const maxSymbolInWord = maxValue => valueString => {
    const words = getWord(valueString);
    const lengthWords = words.map(item => item.length).filter(item => item > maxValue);
    return lengthWords.length > 0 ? `Слова должны содержить максимум ${maxValue} символа(ов)` : false;
}

export const emailValidator = valueString => {
    const emailValid = valueString.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return emailValid ? false : 'Неверный E-mail';
}
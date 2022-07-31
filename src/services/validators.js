/* 
    валидаторы для вводимых строк
 */

// проверка на пустую строку 
export const requaired = (dateMode=false) => value => {
    if (value) return false;
    return !dateMode? 'Поле не может быть пустым': 'Поле не может быть пустым или неверно введена дата';
}

//проверка на пустую строку по маске
export const requairedMask = valueMask => valueString => {
    return valueString && valueString !== valueMask ? false : 'Поле не может быть пустым';
}

//проверка на макс длинну всего текста
export const maxLengthMessage = maxLength => valueString => {
    return valueString && valueString.length <= maxLength ? false : `Максисальная длина сообщения ${maxLength} символов`;
}

//проверка на мин длинну всего текста
export const minLengthMessage = minLength => valueString => {
    return valueString && valueString.length > minLength ? false : `Минимальная длина сообщения ${minLength} символов`;
}

//проверка на ввод всех цифр номера телефона
export const validPhone = valueMaskPhone => valueString => {
    const lengthCountryCode = valueMaskPhone.replace(/\D/g,'').length;
    const lenghtNumberPhone = valueMaskPhone.replace(/[^_]+/g,'').length;
    const lengthInputString = valueString.replace(/\D/g,'').length - lengthCountryCode;
    return lenghtNumberPhone === lengthInputString ? false : 'Неверно введен номер телефона';
}

//проверка на количество введенных слов (строгое соответствие и меньше или равно)
export const countWords = (valueCount, strictMode = false) => valueString => {
    const words = getWord(valueString);
    if (!strictMode)
        return words.length > valueCount ? 'Поле должно содержать только два слова' : false;
    else
        return words.length !== valueCount ? 'Поле должно содержать только два слова' : false;
}

//функция возвращает массив слов из строки
const getWord = valueString => {
    return valueString ? valueString.match(/[^\s]+/g) : [];
}

// проверка на минимальное кол-во символов в словах
export const minSymbolInWord = minValue => valueString => {
    const words = getWord(valueString);
    const lengthWords = words.map(item => item.length).filter(item => item < minValue);
    return lengthWords.length > 0 ? `Слова должны содержить минимум ${minValue} символа(ов)` : false;
}

// проверка на ммаксисальное кол-во символов в словах
export const maxSymbolInWord = maxValue => valueString => {
    const words = getWord(valueString);
    const lengthWords = words.map(item => item.length).filter(item => item > maxValue);
    return lengthWords.length > 0 ? `Слова должны содержить максимум ${maxValue} символа(ов)` : false;
}

// проверка является ли строка e-mail'ом
export const emailValidator = valueString => {
    const emailValid = valueString.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return emailValid ? false : 'Неверный E-mail';
}
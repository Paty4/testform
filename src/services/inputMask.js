/* 
    Сервис по формированию строки номера телефона из маски (маска прописана в константах формы)
    заменяются все символы "_" на цифры
    Вход: вводимая строка
    Выход: строка по маске
 */
import * as constants from "./../constants/formConsts.js";

export const getMaskData = (valueString, typeMask = null) => {
    switch (typeMask) {
        case 'phoneMask':
            return phoneMask(valueString);
        default:
            return valueString;
    }
}

const phoneMask = inputValue => {
    const countryCode = constants.MASK_PHONE.split(' ')[0];
    const lengthCountryCode = countryCode.replace(/\D/g, '').length;
    const dataGroupMask = constants.MASK_PHONE.replace(/-/g, ' ').replace(/[^_\s]/g, '').trim().split(' ').map(item => item.length);
    let regExpString = `(\\d{0,${lengthCountryCode}})`;
    for (let i = 0; i < dataGroupMask.length; i++) {
        regExpString += `(\\d{0,${dataGroupMask[i]}})`;
    }
    const regExp = new RegExp(regExpString);
    const phoneValueGroup = inputValue.replace(/\D/g, '').match(regExp);
    let phoneValue = `${countryCode} (${fillGroupData(phoneValueGroup[2], dataGroupMask[0])}) `;
    for (let i = 1; i < dataGroupMask.length; i++) {
        phoneValue += `${fillGroupData(phoneValueGroup[i + 2], dataGroupMask[i])}${i !== dataGroupMask.length - 1 ? '-' : ''}`;
    }
    return phoneValue;
}

const fillGroupData = (valueGroup, lengthGroup) => {
    if (valueGroup.length === lengthGroup) return valueGroup;
    let returnValue = valueGroup;
    for (let i = valueGroup.length; i < lengthGroup; i++) {
        returnValue += '_';
    }
    return returnValue;
}

export const positionCursor = (valueString) => {
    const numberString = valueString.replace(/\D+/g, '');
    const lastNumber = numberString ? numberString[numberString.length - 1] : '';
    let position = valueString.length;
    position = lastNumber ? valueString.lastIndexOf(lastNumber)+1 : -1; 
    return position > 4 ? position : valueString?.indexOf('_') > -1 ? valueString.indexOf('_') : valueString.length;
}
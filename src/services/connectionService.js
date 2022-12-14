/* 
    сервис по отправке данных на сервер
    вход: 
        1. данные для отправки
        2. statusMode если normal то обращение на точку без ошибки, что либо другое на точку с ошибкой
    Выход:
        результат ответа сервера JSON
        {
            status: "success" || "error"
            message: сообщение
        }
 */
import * as gConstants from './../constants/globalConst.js';

export const sendFormData = async (data, statusMode = 'normal') => {
    const url = statusMode === 'normal' ? gConstants.NORMAL_HREF : gConstants.ERROR_HREF;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const dataResponse = response.headers.get('content-type')?.includes('application/json') ? await response.json() : response;
    
    sleep(2000); //задержкa только для тестов
    
    return dataResponse;
}

//функция задержки только для тестов
const sleep = (ms) => {
    const curTime = (new Date()).getTime();
    let i = 0;
    while (((new Date()).getTime() - curTime) < ms) {
        i++;
    }
} 
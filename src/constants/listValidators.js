import { countWords, emailValidator, maxLengthMessage, maxSymbolInWord, minLengthMessage, minSymbolInWord, requaired, requairedMask, validPhone } from "../services/validators";
import * as constants from "./../constants/formConsts.js";

const cntWords = countWords(constants.COUNT_WORD);
const cntWordsStrict = countWords(constants.COUNT_WORD, true);
const minLengthWord = minSymbolInWord(constants.MIN_LENGTH_WORD);
const maxLengthWord = maxSymbolInWord(constants.MAX_LENGTH_WORD);
const requairedPhone = requairedMask(constants.MASK_PHONE);
const validPhoneNumber = validPhone(constants.MASK_PHONE);
const requairedAll = requaired();
const requairedDate = requaired(true);
const maxLengthMess = maxLengthMessage(constants.MAX_LENGTH_MESSAGE);
const minLengthMess = minLengthMessage(constants.MIN_LENGTH_MESSAGE);

export const fullName = {
    validatorsFout: [requairedAll, cntWordsStrict, minLengthWord, maxLengthWord],
    validatorsChange: [cntWords]
};

export const email = {
    validatorsFout: [requairedAll, emailValidator],
};

export const phone = {
    validatorsFout: [requairedPhone, validPhoneNumber],
};

export const birthday = {
    validatorsFout: [requairedDate],
};

export const message = {
    validatorsFout: [requairedAll, maxLengthMess, minLengthMess],
    validatorsChange: [maxLengthMess, minLengthMess]
};
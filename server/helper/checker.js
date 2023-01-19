const moment = require('moment')

const isDateValid = (daty) => {
    return moment(daty).isValid();
};

const IS_EMPTY_STRING = "String";
const IS_VALID_DATE = "Date";
const IS_VALID_NUMBER = "Number";
const IS_VALID_INTEGER = "Integer";
const IS_VALID_FLOAT = "Float";
const IS_VALID_EMAIL = "email";

/**
 *
 * @param {string | Date | Number } value The value we need to check
 * @param {string} valueType The type to check.
 * @returns `true` if
 */
const isInputValid = (value, valueType) => {

    if (value === undefined) {
        return false;
    }
    if (valueType === IS_EMPTY_STRING) {
        return value !== "" || value.trim().length !== 0;
    }
    if (valueType === IS_VALID_DATE) {
        return isDateValid(value);
    }
    if (valueType === IS_VALID_NUMBER) {
        return !(isNaN(value)) && isFinite(value);
    }
    if (valueType === IS_VALID_INTEGER) {
        return !(isNaN(value)) && Number.isSafeInteger();
    }
    if (valueType === IS_VALID_FLOAT) {
        return !(isNaN(value)) && Number.isFinite(value);
    }
    if (valueType === IS_VALID_EMAIL) {
        const conditionMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return value.match(conditionMail);
    }
    return true;
};

module.exports = {
    isInputValid,
    IS_EMPTY_STRING,
    IS_VALID_DATE,
    IS_VALID_NUMBER,
    IS_VALID_INTEGER,
    IS_VALID_FLOAT,
    IS_VALID_EMAIL
};

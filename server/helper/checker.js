const moment = require('moment')

const isDateValid = (daty) => {
    return moment(daty).isValid();
};

const isInputValid = (value, valueType) => {
    if (value === undefined) {
        return false;
    }
    if (valueType === "String") {
        return !value || value.trim().length === 0;
    }
    if (valueType === "Date") {
        return isDateValid(value);
    }
    if (valueType === "Number") {
        return !isNaN(value) && isFinite(value);
    }
    if (valueType === "Integer") {
        return !isNaN(value) && Number.isSafeInteger();
    }
    if (valueType === "Float") {
        return !isNaN(value) && Number.isFinite(value);
    }
    return true;
};

module.exports = {
    isInputValid
};

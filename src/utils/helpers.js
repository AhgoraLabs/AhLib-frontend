const moment = require('moment');

const memoize = (fn) => {
    const cache = {};
    return (...args) => {
        const n = args[0];
        if (n in cache) {
        return cache[n];
        }
        else {
        const result = fn(n);
        cache[n] = result;
        return result;
        }
    }
}

module.exports = {
    redirectWithMsg: (url, type, msg) => {
        window.localStorage.removeItem('flashData');


        const object = { url, type, msg };
        window.localStorage.setItem('flashData', JSON.stringify(object));
        window.location.href = url;
    },
    memoize,
    showFlashDataMsg: () => {

        const flashData = JSON.parse(window.localStorage.getItem('flashData'));
        const pathUrl = window.location.pathname + '' + window.location.search
        if (flashData?.url === pathUrl) {
            window.localStorage.removeItem('flashData')
            return {
                type: flashData.type,
                msg: flashData.msg
            }
        }
        return {};
    },
    isNotAvailableForLoan: (loan) => {
        if (!loan) return false;

        const momentNow = moment(new Date());
        const loanEnd = moment(loan.newLoandEnd || loan.loanEnd).utc().hours(3);

        const hasActiveLoan = loanEnd.isSameOrAfter(momentNow);
        return hasActiveLoan;
    },
    checkIfUserCanExtendLoan: (loan, user) => {
        if (!loan || loan.person !== user || loan.loanEndHasBeenExtended) return false;

        const dateNow = moment(new Date());
        const loanFinalDate = moment(loan.newLoandEnd || loan.loanEnd).utc().hours(3);

        return dateNow.isSameOrBefore(loanFinalDate, 'day');

    }
}




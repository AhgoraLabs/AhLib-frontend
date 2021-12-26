module.exports = {
    redirectWithMsg: (url, type, msg) => {
        console.log('bateu no redirect');
        window.localStorage.removeItem('flashData');


        const object = { url, type, msg };
        window.localStorage.setItem('flashData', JSON.stringify(object));
        window.location.href = url;
    },
    showFlashDataMsg: () => {

        var flashData = JSON.parse(window.localStorage.getItem('flashData'));
        var pathUrl = window.location.pathname + '' + window.location.search
        if (flashData?.url == pathUrl) {
            window.localStorage.removeItem('flashData')
            return {
                type: flashData.type,
                msg: flashData.msg
            }
        }
        return {};

    }
}




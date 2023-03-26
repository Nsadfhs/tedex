function toastAlert(_message, _timeout = 5000, callback = false) {
    const $toastWrapper = document.createElement("div");
    const $alertMessage = document.createElement("span");

    $toastWrapper.classList.add("toast-message-wrapper");
    $alertMessage.classList.add("toast-message");
    $alertMessage.textContent = _message;

    $toastWrapper.append($alertMessage);
    $bodyElem.append($toastWrapper);

    setTimeout(() => {
        const $toastAlertElemArr = document.querySelectorAll(".toast-message-wrapper");
        for (var i = 0; i < $toastAlertElemArr.length; i++) {
            const $toastAlertElem = $toastAlertElemArr[i];
            console.log($toastAlertElem);
            $toastAlertElem.remove();

            if (callback) {
                callback();
            };
        }
    }, _timeout);
};

function popupModalLayer() {

}
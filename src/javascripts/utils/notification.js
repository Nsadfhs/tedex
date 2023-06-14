/**
 * 
 * @param {*} _message 
 * @param {*} _timeout 
 * @param {*} callback 
 */

function toastAlert(_message, _timeout = 5000, callback = false) {
    const $toastWrapper = document.createElement("div");
    const $alertMessage = document.createElement("span");

    $toastWrapper.classList.add("toast-message-wrapper");
    $toastWrapper.style.position = "fixed";
    $toastWrapper.style.top = "0";
    $toastWrapper.style.left = "50%";
    $toastWrapper.style.transform = "translateX(-50%)";
    $toastWrapper.style.display = "flex";
    $toastWrapper.style.flexDirection = "row";
    $toastWrapper.style.flexWrap = "wrap";
    $toastWrapper.style.justifyContent = "center";
    $toastWrapper.style.alignItems = "center";
    $toastWrapper.style.maxWidth = "var(--max-width__mobile)";
    $toastWrapper.style.width = "100%";
    $toastWrapper.style.height = "auto";
    $toastWrapper.style.paddingTop = "0.5rem";
    $toastWrapper.style.paddingBottom = "0.5rem";
    $toastWrapper.style.backgroundColor = "var(--color-black)";
    $toastWrapper.style.borderRadius = "var(--curved)";
    $toastWrapper.style.zIndex = "9999";
    $toastWrapper.style.animation = "fade_toast 3s ease-out forwards";

    $alertMessage.classList.add("toast-message");
    $alertMessage.style.color = "var(--color-white)";
    $alertMessage.style.fontSize = "var(--font-size__body-2)";
    $alertMessage.style.fontWeight = "var(--font-weight__medium)";
    $alertMessage.style.lineHeight = "var(--line-height__lg)";
    $alertMessage.style.wordBreak = "keep-all";
    $alertMessage.textContent = _message;

    $toastWrapper.append($alertMessage);
    $BODY.append($toastWrapper);

    setTimeout(() => {
        const $toastAlertElemArr = document.querySelectorAll(".toast-message-wrapper");
        for (var i = 0; i < $toastAlertElemArr.length; i++) {
            const $toastAlertElem = $toastAlertElemArr[i];
            // console.log($toastAlertElem);
            $toastAlertElem.remove();

            if (callback) {
                callback();
            };
        }
    }, _timeout);
};

function popupModalLayer() {

}
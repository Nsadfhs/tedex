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
    $alertMessage.classList.add("toast-message");
    $alertMessage.textContent = _message;

    $toastWrapper.append($alertMessage);
    $bodyElem.append($toastWrapper);

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

/**
 * .toast-message-wrapper {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: var(--max-width__mobile);
    width: 100%;
    height: auto;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: var(--color_black);
    border-radius: var(--curved);
    z-index: 9991;
    animation: fade_io 3s ease-out forwards;
}

.toast-message {
    color: var(--color_white);
    font-size: var(--font-size_body_2);
    font-weight: var(--font-weight_medium);
    line-height: var(--line-height_lg);
    word-break: keep-all;
}

@keyframes fade_io {
    0% {
        top: 0;
        opacity: 0;
    }

    4% {
        top: 2rem;
        opacity: 100%;
    }

    6% {
        top: calc(2rem + 10px);
    }

    8% {
        top: calc(2rem - 5px);
    }

    10% {
        top: 2rem;
    }

    90% {
        top: 2rem;
        opacity: 100%;
    }

    91% {
        top: calc(2rem + 10px);
        opacity: 100%;
    }

    100% {
        top: 0;
        opacity: 0;
    }
}
 */

function popupModalLayer() {

}
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
    $toastWrapper.style.position = 'fixed';
    $toastWrapper.style.top = '0';
    $toastWrapper.style.left = '50%';
    $toastWrapper.style.transform = 'translateX(-50%)';
    $toastWrapper.style.display = 'flex';
    $toastWrapper.style.flexDirection = 'row';
    $toastWrapper.style.flexWrap = 'wrap';
    $toastWrapper.style.justifyContent = 'center';
    $toastWrapper.style.alignItems = 'center';
    $toastWrapper.style.maxWidth = 'var(--max-width__mobile)';
    $toastWrapper.style.width = '100%';
    $toastWrapper.style.height = 'auto';
    $toastWrapper.style.paddingTop = '0.5rem';
    $toastWrapper.style.paddingBottom = '0.5rem';
    $toastWrapper.style.backgroundColor = 'var(--color_black)';
    $toastWrapper.style.borderRadius = 'var(--curved)';
    $toastWrapper.style.zIndex = '9991';
    $toastWrapper.style.animation = 'fade_toast 3s ease-out forwards';

    $alertMessage.classList.add("toast-message");
    $alertMessage.style.color = 'var(--color_white)';
    $alertMessage.style.fontSize = 'var(--font-size_body_2)';
    $alertMessage.style.fontWeight = 'var(--font-weight_medium)';
    $alertMessage.style.lineHeight = 'var(--line-height_lg)';
    $alertMessage.style.wordBreak = 'keep-all';
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
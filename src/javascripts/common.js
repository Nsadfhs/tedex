"use strict";

// import {} from "./utils/form.js";
// import {} from "./utils/ajax.js";
// import {} from "./utils/calculation.js";
// import {} from "./utils/notification.js";

// ie 브라우저 접속 방지
if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    alert("Internet Explorer는 지원하지 않는 브라우저 입니다.")
    window.location = "microsoft-edge:" + window.location;
    setTimeout(function () {
        window.location = "https://go.microsoft.com/fwlink/?linkid=2135547";
    }, 1);
};

// 저장 막기
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "s" || e.metaKey && e.key == "s") {
        // console.log("Hey! Ctrl+S event captured!");
        e.preventDefault();
    }
});

// 디버그모드 제어
// const DebugMode = false;
let DebugMode = true;

let baseURL = ""; // 테스트 모드

if (!DebugMode) {
    // 실배포 모드
    baseURL = ""; // 실제 api 주소

    document.addEventListener("keydown", function (e) {
        // 복사 막기
        if (e.ctrlKey && e.key == "c" || e.metaKey && e.key == "c") {
            // console.log("Hey! Ctrl+C event captured!");
            e.preventDefault();
        }

        // f12막기
        if (e.key == "F12") {
            // console.log("Hey! F12 event captured!");
            e.preventDefault();
        }
    })

    // 우클릭등 위협요소 차단
    window.document.oncontextmenu = new Function("return false");
    window.document.onselectstart = new Function("return false");
    window.document.ondragstart = new Function("return false");

    // 콘솔로그 다 비활성화
    console.log = function () { };
};

// 주로쓰는 Element
const $bodyElem = document.querySelector("body");
const $mainElem = document.querySelector("main");
const $formElem = document.querySelector("form");
const isPortraitSize = window.matchMedia('(min-width: 320px) AND (max-width: 575px)').matches;
const isLandscapeSize = window.matchMedia('(min-width: 576px) AND (max-width: 767px)').matches;
const isMobileSize = window.matchMedia('(min-width: 320px) AND (max-width: 767px)').matches;
const isTabletSize = window.matchMedia('(min-width: 768px) AND (max-width: 991px)').matches;
const isLaptopSize = window.matchMedia('(min-width: 992px) AND (max-width: 1199px)').matches;
const isDesktopSize = window.matchMedia('(min-width: 1200px) AND (max-width: 1919px)').matches;
const isWideSize = window.matchMedia('(min-width: 1920px)').matches;
const isLargeSize = window.matchMedia('(min-width: 992px) AND (max-width: 2559px)').matches;

/** URL((Uniform Resource Locator)) 파싱
 * 
 * @param {String} _type 
 * @returns 
 */
function parseURL(_type) {
    const url = document.location;

    switch (_type) {
        case "href":
            return url.href;
            break;
        case "protocol":
            return url.protocol;
            break;
        case "port":
            return url.port;
            break;
        case "host":
            const hostName = url.hostname;
            const hostNameArr = hostName.toString().split('.');
            return hostNameArr;
            break;
        case "path":
            const pathName = url.pathname;
            const pathNameArr = pathName.substring(pathName.indexOf('/') + 1).split('/');
            return pathNameArr;
            break;
        case "parameter":
            const search = url.search;
            let params = new Object;
            if (search) {
                const href = url.href;
                let qs = href.substring(href.indexOf('?') + 1).split('&');

                for (let i = 0; i < qs.length; i++) {
                    qs[i] = qs[i].split('=');
                    params[qs[i][0]] = decodeURIComponent(qs[i][1]);
                };
            } else {
                params = null;
            };
            return params;
            break;
        case "prePath":
            const referrer = document.referrer.replace(/^[^:]+:\/\/[^/]+/, '').replace(/#.*/, '').split("?")[0];
            const referrerArr = referrer.substring(referrer.indexOf('/') + 1).split("/");
            return referrerArr;
            break;
        default:
            return url;
            break;
    }
};

/** null undefined checking에 도움을 주기 위해 태어남. Null이면 true, Null 아니면 false를 반환
 * 
 * @param {*} _value
 * @returns 
 */
function isNullChecking(_value) {
    if (typeof _value === "string") {
        return !!!_value?.trim();
    } else if (typeof _value === "object") {
        return _value.length == 0 ? true : false;
    } else {
        return _value === null || _value === undefined || _value.trim() === "";
    }
};

/** 인자로 들어온 값이 어떤 값이든 실질적인 값이면 true, 아니면 false를 반환
 * 
 * @param {*} value 
 * @returns 
 */
function isTruthy(value) {
    if (typeof value === 'function') {
        return false;
    }
    if (typeof value === 'number') {
        return Boolean(value);
    }
    if (Array.isArray(value)) {
        return value.length !== 0;
    }
    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length !== 0;
    }
    return value !== undefined && value.trim() !== '';
};

/** 인자로 들어온 값이 Falsy 값이면 true, 아니면 false를 반환
 * Falsy값이란 ? false, 0, -0, 0n, '', "", null, undefined, NaN
 * 거기에 추가로 -> "false", "null", "undefined", "NaN"
 * 
 * @param {*} _value 
 * @returns 
 */
function isFalsy(_value) {
    if (_value) {
        if (_value.toLowerCase() === "false" || _value.toLowerCase() === "null" || _value.toLowerCase() === "undefined" || _value.toLowerCase() === "nan") {
            _value = false;
        };
    };
    return !_value;
};

/**
 * 
 * //event.target과 this(=event.currentTarget)의 차이
 * //event.target은 실제 이벤트가 시작된 ‘타깃’ 요소입니다. 버블링이 진행되어도 변하지 않습니다.
 * //this는 ‘현재’ 요소로, 현재 실행 중인 핸들러가 할당된 요소를 참조합니다.
 * 
 * 캡처링 단계 – 이벤트가 하위 요소로 전파되는 단계
 * 타깃 단계 – 이벤트가 실제 타깃 요소에 전달되는 단계
 * 버블링 단계 – 이벤트가 상위 요소로 전파되는 단계
 * 
 */

//e.preventDefault는 해당 엘리먼트의 동작을 중단. 
const preventDefault = function (e) {
    e.preventDefault();
};
// e.stopPropagation 는 상위 엘리먼트들로의 이벤트 전파를 중단시킨다.
// 이벤트버블링 방지
const stopPropagation = function (e) {
    e.stopPropagation();
};

/**
 * document.addEventListener("touchstart", handler, {
 *   capture: false,
 *   once: false,
 *   passive: false
 * });
 * 
 * capture 옵션은 두 가지 값을 가질 수 있습니다.
 * false이면(default 값) 핸들러는 버블링 단계에서 동작합니다.
 * true이면 핸들러는 캡처링 단계에서 동작합니다.
 * 
 * passive 속성이 false인 경우에 touchstart, touchmove와 같은 이벤트가 발생하면 
 * preventDefault를 이용하여 실제 이벤트 자체를 막을 수 있기 때문에, 
 * 브라우저는 scroll을 계속 할지 안할지를 매번 감시해야만 한다.
 * 
 * passive 속성이 true일 경우에는 preventDefault를 이용하여 
 * scroll 이벤트를 막지 않겠다고 브라우저에게 이야기하는 것과 같다. 
 * 따라서, 이 룰을 어기면 브라우저는 가차없이 다음과 같은 에러를 던진다.
 * 
 */

// 스크롤 이벤트 막기
function scrollDisable() {
    // console.log("스크롤막기");
    $bodyElem.classList.add("scroll-none");
    $bodyElem.addEventListener("scroll", preventDefault, { passive: false });
    $bodyElem.addEventListener("touchmove", preventDefault, { passive: false });
    $bodyElem.addEventListener("mousewheel", preventDefault, { passive: false });
};

// 스크롤 이벤트 풀기
function scrollEnable() {
    // console.log("스크롤막기해제")
    $bodyElem.classList.remove("scroll-none");
    $bodyElem.removeEventListener("scroll", preventDefault, { passive: false });
    $bodyElem.removeEventListener("touchmove", preventDefault, { passive: false });
    $bodyElem.removeEventListener("mousewheel", preventDefault, { passive: false });
};

/** 딤(어둡게) 처리
 * 
 * @param {Number} zIndex 
 */
function setDimLayer(zIndex) {
    if (!zIndex) {
        zIndex = 9998;
    }
    // console.log("켜기")
    const $dimLayer = document.createElement("div");
    $dimLayer.classList.add("dim-layer");
    $dimLayer.style.position = "fixed";
    $dimLayer.style.top = 0;
    $dimLayer.style.left = 0;
    $dimLayer.style.width = "100%";
    $dimLayer.style.height = "100%";
    $dimLayer.style.backgroundColor = "var(--color-gray__900)";
    $dimLayer.style.opacity = "0.7";
    $dimLayer.style.zIndex = zIndex;

    $bodyElem.append($dimLayer);
};

// 딤(어둡게) 해제
function offDimLayer() {
    const $dimLayer = document.querySelector(".dim-layer");
    // console.log(dimLayer);
    $dimLayer.remove();
};

// 로딩 스피너 생성
function showSpinner() {
    const $spinner = document.createElement('div');
    $spinner.classList.add("loading-spinner");
    $spinner.style.border = '16px solid #f3f3f3';
    $spinner.style.borderTop = '16px solid #3498db';
    $spinner.style.borderRadius = '50%';
    $spinner.style.width = '120px';
    $spinner.style.height = '120px';
    $spinner.style.animation = 'spin 2s linear infinite';

    $bodyElem.append($spinner);
};

// 로딩 스피너 해제
function hideSpinner() {
    const $spinner = document.querySelector(".loading-spinner");
    // console.log(dimLayer);
    $spinner.remove();
};

/** 해당 페이지 이동 _route 예시 "/sign/in"
 * 
 * @param {String} _route 
 */
function goPage(_route) {
    if (!isFalsy(_route)) {
        location.href = _route;
    } else {
        // console.log(_route, "없음");
    }
};

/** 페이지 뒤로가기 _route 예시 "/sign/in"
 * 
 * @param {String} _route 
 */
function goBack(_route) {
    if (!isNullCheck(_route)) {
        location.href = `${baseURL}${_route}`;
    } else {
        history.back();
    }
};

/** 쿠키정보 만들기
 * 
 * @param {String} _name 
 * @param {*} _value 
 * @param {Int} _days 
 */
function setCookie(_name, _value, _days) {
    let date = new Date();
    let expires = "";

    if (_days) {
        date.setTime(date.getTime() + (_days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }

    document.cookie = _name + "=" + _value + expires + "; path=/";
};

/** 쿠키정보 가져오기
 * 
 * @param {String} _name 
 * @returns 
 */
function getCookie(_name) {
    let x, y;
    let val = document.cookie.split(';');
    for (let i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        // 앞과 뒤의 공백 제거하기
        if (x == _name) {
            return unescape(y);
            // unescape로 디코딩 후 값 리턴
        }
    }
};

/** 쿠키 특정 key(cookie_name)에 value추가
 * 
 * @param {String} _target 
 * @param {*} _value 
 */
function addCookie(_target, _value) {
    let items = getCookie(_target);
    // 이미 저장된 값을 쿠키에서 가져오기
    let maxItemNum = 5;
    // 최대 저장 가능한 아이템개수
    let expire = 7;
    // 쿠키값을 저장할 기간
    if (items) {
        let itemArray = items.split(',');
        if (itemArray.indexOf(id) != -1) {
            // 이미 존재하는 경우 종료
            // console.log('Already exists.');
        } else {
            // 새로운 값 저장 및 최대 개수 유지하기
            itemArray.unshift(id);
            if (itemArray.length > maxItemNum) itemArray.length = 5;
            items = itemArray.join(',');
            setCookie(`${_target}`, items, expire);
        }
    } else {
        // 신규 id값 저장하기
        setCookie(`${_target}`, _value, expire);
    }
};

/** 특정 쿠키(cookie_name) 탐색 후, 삭제
 * 
 * @param {String} _name 
 */
function deleteCookie(_name) {
    document.cookie = _name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

/** element textContent에 값 넣기
 * 
 * @param {String} _target 
 * @param {*} _text
 */
function renderText(_target, _text) {
    // console.log("renderText", _target);
    // console.log(template);
    const $targetElem = document.getElementById(_target);
    if ($targetElem) {
        // console.log($targetElem.tagName);
        if ($targetElem.tagName == "INPUT") {
            // console.log($targetElem.tagName, "적절한 타겟이 아닙니다.(setTextValue를 권장합니다.)");
            return;
        } else {
            if (!isNullCheck(_text)) {
                $targetElem.innerText = _text;
            } else {
                // console.log(_target, `${_text}가 이상해요`);
                $targetElem.innerText = "-";
                return;
            };
        }
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    };
};

/** element에 자식 넣기 innerHTML
 * 
 * @param {*} _target 
 * @param {String} _template 
 */
function renderHTML(_target, _template) {
    // console.log("renderHTML", _target);
    // console.log(template);
    const $targetElem = document.getElementById(_target);
    if ($targetElem) {
        $targetElem.innerHTML = _template;
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** 부모(_target : id)를 탐색 후, 부모가 있으면 자식 element append
 * 
 * @param {String} _target 
 * @param {Element} _template 
 * @returns 
 */
function appendHTML(_target, _template) {
    // console.log("HTML_tag", _target);
    // console.log(template);
    const $targetElem = document.getElementById(_target);
    if ($targetElem) {
        if (_template) {
            $targetElem.append(_template);
        } else {
            // console.log(_template, "append 할 수 있는 템플릿이 없어요");
            return;
        }
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** img element에 src 넣기 
 * 
 * @param {String} _target 
 * @param {String} _url 
 * @returns 
 */
function renderImage(_target, _url) {
    // console.log("renderImage", _target);
    // console.log(template);
    if (_url) {
        const $targetElem = document.getElementById(_target);
        if ($targetElem) {
            // console.log($targetElem.tagName);
            if ($targetElem.tagName == "IMG") {
                $targetElem.src = _url;
            } else {
                // console.log($targetElem.tagName, "적절한 타겟이 아닙니다.(Img)");
                return;
            };
        } else {
            // console.log(_target, "타겟이 없어요");
            return;
        }
    } else {
        // console.log(_target, `${_url}가 이상해요`);
        return;
    }
};

// console.log("URL", parseURL("href"));

// setDimLayer();
// scrollDisable();
// scrollEnable();
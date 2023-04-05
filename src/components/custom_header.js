"use strict";
/** null undefined checking에 도움을 주기 위해 태어남 */
function isNullChecking(val) {
    return !(!!val?.trim());
};

/**
 * 
 * type
 * toggle: str타입으로 true/false 표기
 * home: str타입으로 anchor, home 경로 지정
 * logout: str타입으로 true/false 표기
 * 
 * */
class Header extends HTMLElement {
    constructor() {
        super();
    };
    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // // //console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // // //console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    };
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // // //console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    };
    setModule(moduleElement, moduleStyle) {
        // // //console.log(moduleElement);
        // // //console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    };
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        // console.log(_params);

        this.classList.add("header-wrapper");

        let { type, home, height } = _params;

        // home link가 없을경우 강제로 root의 경로를 작성
        if (isNullChecking(home)) {
            home = "/";
        };

        let elemArr = new Array;

        const $leftWrapper = document.createElement("section");
        $leftWrapper.classList.add("header-wrapper__left");
        const $centerWrapper = document.createElement("section");
        $centerWrapper.classList.add("header-wrapper__center");
        const $rightWrapper = document.createElement("section");
        $rightWrapper.classList.add("header-wrapper__right");
        const $toggleButton = document.createElement("button");
        $toggleButton.id = "toggle_sidenav";
        $toggleButton.classList.add("toggle-button");
        if (mediaQueryLaptop.matches) {
            $toggleButton.classList.add("on");
        };

        const $logoutButton = document.createElement("button");
        $logoutButton.type = "button";
        $logoutButton.id = "do_logout";
        $logoutButton.classList.add("header-logout-button");
        // console.log(mediaQueryMobile.matches);
        if (!mediaQueryMobile.matches) {
            $logoutButton.classList.add("icon");
        } else {
            $logoutButton.textContent = "로그아웃";
        };

        const $homeAnchor = document.createElement("a");
        $homeAnchor.href = home;
        $homeAnchor.classList.add("header-brand-logo");
        const $brandLogo = document.createElement("img");
        $brandLogo.src = "/public/images/logo/logo.svg";
        // $brandLogo.src = "/public/images/logo/header_logo.png";
        $brandLogo.alt = `logo image`;
        $brandLogo.classList.add("header-logo-image");
        $homeAnchor.append($brandLogo);

        switch (type) {
            case "cms":
                this.classList.add("cms", "border-bottom__1");

                elemArr.push($leftWrapper);
                $leftWrapper.append($toggleButton);

                elemArr.push($centerWrapper);
                $centerWrapper.append($homeAnchor);

                elemArr.push($rightWrapper);
                $rightWrapper.append($logoutButton);

                const $contentsWrapper = document.createElement("section");
                $contentsWrapper.classList.add("contents-wrapper", "cms");
                const $mainWrapper = document.querySelector("main");
                if ($mainWrapper) {
                    $contentsWrapper.append(document.querySelector("main"));
                } else {
                    $contentsWrapper.append(document.createElement("main"));
                };
                const $sideBarWrapper = document.getElementById("snb_wrapper");
                if ($sideBarWrapper) {
                    $contentsWrapper.append(document.getElementById("snb_wrapper"));
                } else {
                    $contentsWrapper.append(document.createElement("aside#snb_wrapper"));
                };

                this.after($contentsWrapper);

                break;
            case "a":
                elemArr.push($leftWrapper);
                $leftWrapper.append($homeAnchor);

                elemArr.push($rightWrapper);
                $rightWrapper.append($toggleButton);

                break;
            default:
                console.log("unknown-type");
                break;
        }

        return elemArr;
    }
    // Style 처리부
    setStyle(_params) {

        let { color, bgcolor, size, align, padding, margin, radius, width, height } = _params;

        // 높이 설정 50px보다 작게는 안됨
        if (!isNullChecking(height)) {
            this.style.height = height;
        } else {
            this.style.height = "auto";
        };

        const styleString = `
            * {
                box-sizing: border-box;
                color: inherit;
                font: inherit;
                background-color: transparent;
                padding: 0;
                margin: 0;
                border: none;
                outline: 0;
                text-decoration: 0;
                list-style: none;
                cursor: default;
                -webkit-tap-highlight-color: transparent;
            }

            .header-wrapper__left {
                flex: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
            }

            .header-wrapper__right {
                flex: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
            }

            .toggle-button {
                position: relative;
                display: inline-block;
                width: 1.75rem;
                height: 1.75rem;
                line-height: 1.75rem;
                font-size: 0;
                cursor: pointer;
            }

            .toggle-button:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url("/public/images/icon/ic_hamburger.svg");
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }

            .header-brand-logo {
                display: inline-block;
                width: auto;
                height: 1.75rem;
                vertical-align: middle;
                text-align: center;
                font-size: 0;
                cursor: pointer;
            }

            .header-logo-image {
                display: block;
                width: auto;
                height: 100%;
                cursor: pointer;
            }

            .header-logout-button {
                display: inline-block;
                font-size: 0.75rem;
                font-weight: bolder;
                line-height: 1;
                width: auto;
                height: 1.75rem;
                vertical-align: middle;
                border: var(--border-lightgray__1);
                border-radius: 3.125rem;
                padding: 0.5rem 1.125rem;
                cursor: pointer;
            }

            .header-logout-button.icon {
                width: 1.75rem;
                height: 1.75rem;
                padding: 0.5rem 0.5rem;
                background-image: url("/public/images/icon/ic_logout.svg");
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }

            /* old mobile and wearable  */
            @media all and (min-width: 280px) and (max-width: 359px) {
                :root {}
            }
            
            /* Small devices (landscape phones, 576px and up) */
            @media screen and (min-width:576px) {
                :root {}
            }
            
            /* Medium devices (tablets, 768px and up) */
            @media screen and (min-width:768px) {
                :root {}
                .header-logout-button {
                    border: var(--border-lightgray__1);
                }
            }
            
            /* Large devices (small desktops and laptop, 992px and up) */
            @media screen and (min-width:992px) {
                :root {}
            }
            
            /* Large devices (desktops and large laptop, 1200px and up) */
            @media screen and (min-width:1200px) {
                :root {}
            }
            
            /* Extra Extra large devices (large desktops, 1440px and up) */
            @media screen and (min-width:1440px) {
                :root {}
            }
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
        let { login, gap, sideNavWidth } = _params;
        try {
            if (isNullChecking(sideNavWidth)) {
                sideNavWidth = 200;
            };

            if (isNullChecking(gap)) {
                gap = 32;
            };

            const $toggleSidenav = this.shadowRoot.querySelector("#toggle_sidenav");
            if ($toggleSidenav) {
                $toggleSidenav.addEventListener("click", function (e) {
                    // console.log("토글");
                    const $sidenav = document.getElementById("snb_wrapper");
                    if ($sidenav) {
                        const $mainWrapper = document.querySelector("main");
                        console.log(this.classList.contains("on"));
                        // console.log("열려있다");

                        if (this.classList.contains("on")) {
                            this.classList.remove("on");
                            $sidenav.style.left = `calc(-${sideNavWidth}px - ${gap}px)`;
                            $mainWrapper.style.marginLeft = "0px";
                            // console.log("닫았다");
                        } else {
                            this.classList.add("on");
                            $sidenav.style.left = "0";
                            $mainWrapper.style.marginLeft = `calc(${sideNavWidth}px + ${gap}px)`;
                            // console.log("열었다");
                        };
                    } else {
                        console.log("사이드 바 없음");
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }

        try {
            const $logoutButton = this.shadowRoot.querySelector("#do_logout");
            if ($logoutButton) {
                $logoutButton.addEventListener("click", function () {
                    // console.log("로그아웃");
                    deleteCookie("user_type");
                    setCookie('is_logined', false);
                    sessionStorage.setItem('is_logined', false);

                    if (!isNullChecking(login)) {
                        location.href = login;
                    } else {
                        location.href = "/";
                    };
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
customElements.define('custom-header', Header);
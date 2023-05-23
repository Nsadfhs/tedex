"use strict";

/** <body is="cms-layout" home="/" logo="logo.svg">
*
 */
class CMSLayout extends HTMLBodyElement {
    constructor() {
        super();
    };
    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    };
    connectedCallback() {
        const ATTRIBUTE_OBJECT = this.checkAttribute();
        this.setModule(this.setElement(ATTRIBUTE_OBJECT), this.setStyle(ATTRIBUTE_OBJECT));
        this.setEvent(ATTRIBUTE_OBJECT);
    };
    setModule(moduleElement, moduleStyle) {
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.append(moduleElement[i]);
            }
        };
    };
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        let { home, logo, height, sidenavwidthrem } = _params;
        let elemArr = new Array;

        // home link가 없을경우 강제로 root의 경로를 작성
        if (isFalsy(home)) {
            home = "/";
        };

        if (isFalsy(logo)) {
            logo = "logo.svg";
        };

        if (isFalsy(height)) {
            height = "60px";
        };

        this.classList.add("body-wrapper", "cms");

        const $HEADER = document.createElement("custom-header");
        $HEADER.setAttribute("type", "cms");
        $HEADER.setAttribute("home", home);
        $HEADER.setAttribute("logo", logo);
        $HEADER.setAttribute("sidenavwidthrem", sidenavwidthrem);
        $HEADER.setAttribute("height", height);

        const $CONTENTS_WRAPPER = document.createElement("section");
        $CONTENTS_WRAPPER.classList.add("contents-wrapper", "cms");

        const $SNB_WRAPPER = document.getElementById("snb_wrapper");
        if ($SNB_WRAPPER) {
            $CONTENTS_WRAPPER.append($SNB_WRAPPER);
            $SNB_WRAPPER.classList.add("sideNav-wrapper", "cms");
        } else {
            const $NEW_SNB_WRAPPER = document.createElement("aside");
            $NEW_SNB_WRAPPER.id = "snb_wrapper";
            $CONTENTS_WRAPPER.append($NEW_SNB_WRAPPER);
            $NEW_SNB_WRAPPER.classList.add("sideNav-wrapper", "cms");
        };

        const $MAIN = document.querySelector("main");
        if ($MAIN) {
            $CONTENTS_WRAPPER.append($MAIN);
            $MAIN.classList.add("main-container", "cms");

        } else {
            const $NEW_MAIN = document.createElement("main");
            $CONTENTS_WRAPPER.append($NEW_MAIN);
            $NEW_MAIN.classList.add("main-container", "cms");
        };

        this.prepend($CONTENTS_WRAPPER);
        this.prepend($HEADER);

        return elemArr;
    }
    // Style 처리부
    setStyle(_params) {

        let { color, bgcolor, size, align, padding, margin, radius, width, height } = _params;

        // 높이 설정 50px보다 작게는 안됨
        if (isFalsy(height)) {
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
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    }
}
customElements.define('cms-layout', CMSLayout, { extends: "body" });

/**    <custom-header type="cms" home="/" logo="logo.svg"></custom-header>
*
 * type: str타입으로 header layout 변경
* home: str타입으로 anchor, home 경로 지정
* logo: str타입으로 img 파일이름&확장자, /public/images/logo 경로 default
* loginPath: 로그인 페이지 경로를 알려주면 알아서 튕겨줌, 없으면 Root 페이지로 감
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
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    };
    connectedCallback() {
        const ATTRIBUTE_OBJECT = this.checkAttribute();
        this.setModule(this.setElement(ATTRIBUTE_OBJECT), this.setStyle(ATTRIBUTE_OBJECT));
        this.setEvent(ATTRIBUTE_OBJECT);
    };
    setModule(moduleElement, moduleStyle) {
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $STYLED = document.createElement("style");
        $STYLED.textContent = moduleStyle;
        this.shadowRoot.append($STYLED);
    };
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        this.classList.add("header-container");

        let { type, home, logo, height } = _params;
        let elemArr = new Array;

        // home link가 없을경우 강제로 root의 경로를 작성
        if (isFalsy(home)) {
            home = "/";
        };

        if (isFalsy(height)) {
            height = "60px";
        };

        this.style.minHeight = height;

        const $HEADER_LEFT_WRAPPER = document.createElement("section");
        $HEADER_LEFT_WRAPPER.classList.add("header-contents__left");
        const $HEADER_CENTER_WRAPPER = document.createElement("section");
        $HEADER_CENTER_WRAPPER.classList.add("header-contents__center");
        const $HEADER_RIGHT_WRAPPER = document.createElement("section");
        $HEADER_RIGHT_WRAPPER.classList.add("header-contents__right");
        const $TOGGLE_BUTTON = document.createElement("button");
        $TOGGLE_BUTTON.id = "toggle_sidenav";
        $TOGGLE_BUTTON.classList.add("toggle-button");

        if (!isPortraitSize) {
            $TOGGLE_BUTTON.classList.add("on");
        } else {
            $TOGGLE_BUTTON.classList.remove("on");
        };

        // window.addEventListener("resize", () => {
        //     if (!isPortraitSize) {
        //         $TOGGLE_BUTTON.classList.add("on");
        //     } else {
        //         $TOGGLE_BUTTON.classList.remove("on");
        //     };
        // });

        const $LOGOUT_BUTTON = document.createElement("button");
        $LOGOUT_BUTTON.type = "button";
        $LOGOUT_BUTTON.id = "do_logout";
        $LOGOUT_BUTTON.classList.add("header-logout-button");

        if (isPortraitSize) {
            $LOGOUT_BUTTON.classList.add("icon");
            $LOGOUT_BUTTON.textContent = "";
        } else {
            $LOGOUT_BUTTON.classList.remove("icon");
            $LOGOUT_BUTTON.textContent = "로그아웃";
        };

        window.addEventListener("resize", () => {
            if (isPortraitSize) {
                $LOGOUT_BUTTON.classList.add("icon");
                $LOGOUT_BUTTON.textContent = "";
            } else {
                $LOGOUT_BUTTON.classList.remove("icon");
                $LOGOUT_BUTTON.textContent = "로그아웃";
            };
        });

        const $HOME_ANCHOR_BUTTON = document.createElement("a");
        $HOME_ANCHOR_BUTTON.href = home;
        $HOME_ANCHOR_BUTTON.classList.add("header-brand-logo");
        const BRAND_LOGO = document.createElement("img");
        BRAND_LOGO.src = `/public/images/logo/${logo}`;
        BRAND_LOGO.alt = `logo image`;
        BRAND_LOGO.classList.add("header-logo-image");
        $HOME_ANCHOR_BUTTON.append(BRAND_LOGO);

        switch (type) {
            case "cms":
                this.classList.add("cms");

                elemArr.push($HEADER_LEFT_WRAPPER);
                $HEADER_LEFT_WRAPPER.append($TOGGLE_BUTTON);

                elemArr.push($HEADER_CENTER_WRAPPER);
                $HEADER_CENTER_WRAPPER.append($HOME_ANCHOR_BUTTON);

                elemArr.push($HEADER_RIGHT_WRAPPER);
                $HEADER_RIGHT_WRAPPER.append($LOGOUT_BUTTON);

                break;
            case "a":
                elemArr.push($HEADER_LEFT_WRAPPER);
                $HEADER_LEFT_WRAPPER.append($HOME_ANCHOR_BUTTON);

                elemArr.push($HEADER_RIGHT_WRAPPER);
                $HEADER_RIGHT_WRAPPER.append($TOGGLE_BUTTON);

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
        if (isFalsy(height)) {
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
 
            .header-contents__left {
                flex: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
            }
 
            .header-contents__center {
                flex: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: center;
                align-items: center;
            }
 
            .header-contents__right {
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
                background-image: url("../../public/images/icon/ic_hamburger.svg");
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
                border: none;
                border-radius: 3.125rem;
                padding: 0.5rem 1.125rem;
                cursor: pointer;
            }
 
            .header-logout-button.icon {
                width: 1.75rem;
                height: 1.75rem;
                padding: 0.5rem 0.5rem;
                background-image: url("../../public/images/icon/ic_logout.svg");
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
                    border: var(--border-gray__1);
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
        let { loginPath, gap, sidenavwidthrem } = _params;
        try {
            // console.log(sidenavwidthrem)
            if (isFalsy(sidenavwidthrem)) {
                sidenavwidthrem = "12.5rem";
            };
            // console.log(gap);
            // console.log(isFalsy(gap));
            if (isFalsy(gap)) {
                gap = `0px`;
            };

            // console.log(isPortraitSize);
            if (isPortraitSize) {
                sidenavwidthrem = "100%";
            };

            window.addEventListener("resize", () => {
                if (isPortraitSize) {
                    sidenavwidthrem = "100%";
                    gap = `0px`;
                } else {
                    sidenavwidthrem = "12.5rem";
                    gap = `0px`;
                };
            });

            const $toggleSidenav = this.shadowRoot.querySelector("#toggle_sidenav");
            if ($toggleSidenav) {
                $toggleSidenav.addEventListener("click", function (e) {
                    // console.log("토글");
                    const $sidenav = document.getElementById("snb_wrapper");
                    if ($sidenav) {
                        const $MAIN = document.querySelector("main");
                        // console.log(this.classList.contains("on"));
                        // console.log("열려있다");

                        if (this.classList.contains("on")) {
                            this.classList.remove("on");
                            // console.log(`calc(-${sidenavwidthrem} - ${gap})`);
                            $sidenav.style.left = `calc(-${sidenavwidthrem} - ${gap})`;
                            $MAIN.style.marginLeft = "0px";
                            // console.log("닫았다");
                        } else {
                            this.classList.add("on");
                            $sidenav.style.left = "0";
                            $MAIN.style.marginLeft = `calc(${sidenavwidthrem} + ${gap})`;
                            // $MAIN.style.marginLeft = `0px`;
                            // console.log("열었다");
                        };

                        window.addEventListener("resize", () => {
                            if (this.classList.contains("on")) {
                                this.classList.remove("on");
                                // console.log(`calc(-${sidenavwidthrem} - ${gap})`);
                                $sidenav.style.left = `calc(-${sidenavwidthrem} - ${gap})`;
                                $MAIN.style.marginLeft = "0px";
                                // console.log("닫았다");
                            } else {
                                this.classList.add("on");
                                $sidenav.style.left = "0";
                                $MAIN.style.marginLeft = `calc(${sidenavwidthrem} + ${gap})`;
                                // $MAIN.style.marginLeft = `0px`;
                                // console.log("열었다");
                            };
                        });
                    } else {
                        // console.log("사이드 바 없음");
                    }
                });
            }
        } catch (e) {
            // console.log(e);
        }

        try {
            const $LOGOUT_BUTTON = this.shadowRoot.querySelector("#do_logout");
            if ($LOGOUT_BUTTON) {
                $LOGOUT_BUTTON.addEventListener("click", function () {
                    // console.log("로그아웃");
                    deleteCookie("user_type");
                    setCookie('is_logged_in', false);
                    sessionStorage.setItem('is_logged_in', false);

                    if (isTruthy(loginPath)) {
                        location.href = loginPath;
                    } else {
                        location.href = "/";
                    };
                });
            }
        } catch (e) {
            // console.log(e);
        }
    }
}
customElements.define('custom-header', Header);

class CustomAnchor extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        const ATTRIBUTE_OBJECT = this.checkAttribute();
        // console.log(ATTRIBUTE_OBJECT);
        this.setModule(this.setElement(ATTRIBUTE_OBJECT), this.setStyle(ATTRIBUTE_OBJECT));
        this.setEvent(ATTRIBUTE_OBJECT);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $STYLED = document.createElement("style");
        $STYLED.textContent = moduleStyle;
        this.shadowRoot.append($STYLED);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {

        let { type, text } = _params;

        let elemArr = new Array;

        // console.log(this);

        if (isFalsy(this.textContent)) {
            if (isFalsy(text)) {
                text = "";
            }
        } else {
            if (isFalsy(text)) {
                text = this.textContent;
            }
        };

        switch (type) {
            case "cms_snb":
                this.classList.add("sideNav-link");
                const $ICON_WRAPPER = document.createElement("i");
                $ICON_WRAPPER.classList.add("anchor-icon");


                const $CONTENTS_WRAPPER = document.createElement("span");
                $CONTENTS_WRAPPER.classList.add("anchor-text");
                $CONTENTS_WRAPPER.textContent = text;
                elemArr.push($ICON_WRAPPER);
                elemArr.push($CONTENTS_WRAPPER);
                break;
            default:
                // console.log("unknown-type");
                break;
        }

        return elemArr;
    }
    // Style 처리부
    setStyle(_params) {

        let { color, bgcolor, size, align, padding, margin, radius, width, height, icon } = _params;
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
 
            .anchor-icon {
                content: '';
                display: inline-block;
                width: 1.25rem;
                height: 1.25rem;
                font-size: 0;
                background-image: url(/public/images/icon/${icon});
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
                cursor: pointer;
            }
 
            .anchor-text {
                color: var(--color-black__off);
                font-size: 0.875rem;
                font-weight: bold;
                line-height: 1.25rem;
                cursor: pointer;
            }
 
            .anchor-text:hover {
                color: var(--color-primary);
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
        let { href } = _params;

        // home link가 없을경우 강제로 root의 경로를 작성
        if (isFalsy(href)) {
            href = "/";
        };


        try {
            this.addEventListener("click", function () {
                location.href = `${href}`;
            })
        } catch (e) {
            // console.log(e);
        }


    }
}
customElements.define('custom-anchor', CustomAnchor);
"use strict";
/** null undefined checking에 도움을 주기 위해 태어남 */
function isNullChecking(val) {
    return !(!!val?.trim());
};

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
        // this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.append(moduleElement[i]);
            }
        };
        // const $styledElem = document.createElement("style");
        // $styledElem.textContent = moduleStyle;
        // this.shadowRoot.append($styledElem);
    };
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        // console.log(_params);

        let { home, logo } = _params;
        let elemArr = new Array;

        // home link가 없을경우 강제로 root의 경로를 작성
        if (isNullChecking(home)) {
            home = "/";
        };

        if (isNullChecking(logo)) {
            logo = "logo.svg";
        };

        this.classList.add("wrapper", "scroll-none");

        const $headerWrapper = document.createElement("custom-header");
        $headerWrapper.setAttribute("type", "cms");
        $headerWrapper.setAttribute("home", home);
        $headerWrapper.setAttribute("logo", logo);
        $headerWrapper.classList.add("header-wrapper", "cms");

        const $contentsWrapper = document.createElement("section");
        $contentsWrapper.classList.add("contents-wrapper", "cms");

        const $sideBarWrapper = document.getElementById("snb_wrapper");
        if ($sideBarWrapper) {
            $contentsWrapper.append($sideBarWrapper);
            $sideBarWrapper.classList.add("sideNav-wrapper", "cms");
        } else {
            const $createdSideBarWrapper = document.createElement("aside");
            $createdSideBarWrapper.id = "snb_wrapper";
            $contentsWrapper.append($createdSideBarWrapper);
            $createdSideBarWrapper.classList.add("sideNav-wrapper", "cms");
        };

        const $mainWrapper = document.querySelector("main");
        if ($mainWrapper) {
            $contentsWrapper.append($mainWrapper);
            $mainWrapper.classList.add("main-wrapper", "cms");

        } else {
            const $createdMainWrapper = document.createElement("main");
            $contentsWrapper.append($createdMainWrapper);
            $createdMainWrapper.classList.add("main-wrapper", "cms");
        };

        this.prepend($contentsWrapper);
        this.prepend($headerWrapper);

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

        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
        // let { login, gap, sideNavWidth } = _params;

        // try {
        //     if (isNullChecking(sideNavWidth)) {
        //         sideNavWidth = 200;
        //     };

        //     if (isNullChecking(gap)) {
        //         gap = 0;
        //     };

        //     const $toggleSidenav = this.querySelector("#toggle_sidenav");
        //     console.log($toggleSidenav);
        //     if ($toggleSidenav) {
        //         $toggleSidenav.addEventListener("click", function (e) {
        //             // console.log("토글");
        //             const $sidenav = document.getElementById("snb_wrapper");
        //             if ($sidenav) {
        //                 const $mainWrapper = document.querySelector("main");
        //                 console.log(this.classList.contains("on"));
        //                 // console.log("열려있다");

        //                 if (this.classList.contains("on")) {
        //                     this.classList.remove("on");
        //                     $sidenav.style.left = `calc(-${sideNavWidth}px - ${gap}px)`;
        //                     $mainWrapper.style.marginLeft = "0px";
        //                     // console.log("닫았다");
        //                 } else {
        //                     this.classList.add("on");
        //                     $sidenav.style.left = "0";
        //                     $mainWrapper.style.marginLeft = `calc(${sideNavWidth}px + ${gap}px)`;
        //                     // console.log("열었다");
        //                 };
        //             } else {
        //                 console.log("사이드 바 없음");
        //             }
        //         });
        //     }
        // } catch (e) {
        //     console.log(e);
        // }

        // try {
        //     const $logoutButton = this.querySelector("#do_logout");
        //     if ($logoutButton) {
        //         $logoutButton.addEventListener("click", function () {
        //             // console.log("로그아웃");
        //             deleteCookie("user_type");
        //             setCookie('is_logined', false);
        //             sessionStorage.setItem('is_logined', false);

        //             if (!isNullChecking(login)) {
        //                 location.href = login;
        //             } else {
        //                 location.href = "/";
        //             };
        //         });
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }
}
customElements.define('cms-layout', CMSLayout, { extends: "body" });

/**    <custom-header type="cms" home="/" logo="logo.svg"></custom-header>
 * 
 * type: str타입으로 header layout 변경
 * home: str타입으로 anchor, home 경로 지정
 * logo: str타입으로 img 파일이름&확장자, /public/images/logo 경로 default
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

        let { type, home, logo } = _params;

        // home link가 없을경우 강제로 root의 경로를 작성
        if (isNullChecking(home)) {
            home = "/";
        };

        let elemArr = new Array;

        const $leftWrapper = document.createElement("section");
        $leftWrapper.classList.add("header-contents__left");
        const $centerWrapper = document.createElement("section");
        $centerWrapper.classList.add("header-contents__center");
        const $rightWrapper = document.createElement("section");
        $rightWrapper.classList.add("header-contents__right");
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
        $brandLogo.src = `/public/images/logo/${logo}`;
        $brandLogo.alt = `logo image`;
        $brandLogo.classList.add("header-logo-image");
        $homeAnchor.append($brandLogo);

        switch (type) {
            case "cms":
                this.classList.add("cms");

                elemArr.push($leftWrapper);
                $leftWrapper.append($toggleButton);

                elemArr.push($centerWrapper);
                $centerWrapper.append($homeAnchor);

                elemArr.push($rightWrapper);
                $rightWrapper.append($logoutButton);

                const $contentsWrapper = document.createElement("section");
                $contentsWrapper.classList.add("contents-wrapper", "cms");

                const $sideBarWrapper = document.getElementById("snb_wrapper");
                if ($sideBarWrapper) {
                    $contentsWrapper.append($sideBarWrapper);
                    $sideBarWrapper.classList.add("sideNav-wrapper", "cms");
                } else {
                    const $createdSideBarWrapper = document.createElement("aside");
                    $createdSideBarWrapper.id = "snb_wrapper";
                    $contentsWrapper.append($createdSideBarWrapper);
                    $createdSideBarWrapper.classList.add("sideNav-wrapper", "cms");
                };

                const $mainWrapper = document.querySelector("main");
                if ($mainWrapper) {
                    $contentsWrapper.append($mainWrapper);
                    $mainWrapper.classList.add("main-wrapper", "cms");

                } else {
                    const $createdMainWrapper = document.createElement("main");
                    $contentsWrapper.append($createdMainWrapper);
                    $createdMainWrapper.classList.add("main-wrapper", "cms");
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
                gap = 0;
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

class CustomAnchor extends HTMLElement {
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
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // // //console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
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
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {

        let { type, text } = _params;

        let elemArr = new Array;

        console.log(this);

        if (isNullChecking(this.textContent)) {
            if (isNullChecking(text)) {
                text = "";
            }
        } else {
            if (isNullChecking(text)) {
                text = this.textContent;
            }
        };

        switch (type) {
            case "cms_snb":
                this.classList.add("sideNav-link");
                const $iconWrapper = document.createElement("i");
                $iconWrapper.classList.add("anchor-icon");


                const $contentsWrapper = document.createElement("span");
                $contentsWrapper.classList.add("anchor-text");
                $contentsWrapper.textContent = text;
                elemArr.push($iconWrapper);
                elemArr.push($contentsWrapper);
                break;
            default:
                console.log("unknown-type");
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
        if (isNullChecking(href)) {
            href = "/";
        };


        try {
            this.addEventListener("click", function () {
                location.href = `${href}`;
            })
        } catch (e) {
            console.log(e);
        }


    }
}
customElements.define('custom-anchor', CustomAnchor);
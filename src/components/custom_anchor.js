"use strict";

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
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
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
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {

        let { type, text } = _params;

        let elemArr = new Array;

        // console.log(this);

        if (!isTruthy(this.textContent)) {
            if (!isTruthy(text)) {
                text = "";
            }
        } else {
            if (!isTruthy(text)) {
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
        if (!isTruthy(href)) {
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
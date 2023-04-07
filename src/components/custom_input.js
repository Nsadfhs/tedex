"use strict";

class CustomInput extends HTMLElement {
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

        let { type, category, label, value } = _params;

        let elemArr = new Array;

        if (isNullChecking(this.textContent)) {
            if (isNullChecking(label)) {
                label = "Label";
            }
        } else {
            if (isNullChecking(label)) {
                label = this.textContent;
            }
        };

        if (isNullChecking(type)) {
            type = "text";
        };

        if (isNullChecking(category)) {
            category = "a";
        };

        if (isNullChecking(value)) {
            value = false;
        } else {
            value = true;
        };

        const $labelWrapper = document.createElement("label");
        $labelWrapper.textContent = label;
        const $inputWrapper = document.createElement("input");
        $inputWrapper.type = type;

        switch (type) {
            case "text":
                this.classList.add("input-wrapper");
                $labelWrapper.classList.add(`label__${category}`);
                $inputWrapper.classList.add(`input__${category}`);
                switch (category) {
                    case "a":
                        this.classList.add("horizontal");

                        elemArr.push($labelWrapper);
                        elemArr.push($inputWrapper);
                        break;
                    case "b":
                        this.classList.add("vertical");

                        elemArr.push($labelWrapper);
                        elemArr.push($inputWrapper);
                        break;
                    case "b":
                        // this.classList.add("vertical");

                        elemArr.push($inputWrapper);
                        break;
                    default:
                        console.log("unknown-category");
                        break;
                }

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

            label {
                display: inline-block;
                min-width: 5rem;
                width: auto;
                height: 2rem;
            }

            input {
                display: inline-block;
                width: 100%;
                height: 2rem;
                padding-left: 1rem;
                padding-right: 1rem;
                border: var(--border-gray__1);
                border-radius: var(--curved);
            }

            .input__a {

            }

            .input__b {

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
            this.querySelector("input").addEventListener("input", function () {
                console.log(this.value);
            })
        } catch (e) {
            console.log(e);
        }


    }
}
customElements.define('custom-input', CustomInput);
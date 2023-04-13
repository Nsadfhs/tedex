"use strict";
let inputCount = 0;
class CustomInput extends HTMLElement {
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
    };
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    };
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
    };
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {

        let { type, category, label, value, name, id } = _params;

        let elemArr = new Array;

        if (!isTruthy(this.textContent)) {
            if (!isTruthy(label)) {
                label = "Label";
            }
        } else {
            if (!isTruthy(label)) {
                label = this.textContent;
            }
        };

        if (!isTruthy(type)) {
            type = "text";
        };

        if (!isTruthy(category)) {
            category = "a";
        };

        if (!isTruthy(value)) {
            value = false;
        };

        if (!isTruthy(id)) {
            id = `${type}_${category}_${inputCount}`;
        };

        if (!isTruthy(name)) {
            name = `${type}_${category}`;
        } else {

        }

        const $labelWrapper = document.createElement("label");
        $labelWrapper.textContent = label;
        $labelWrapper.setAttribute("for", id);
        const $inputWrapper = document.createElement("input");
        $inputWrapper.type = type;
        $inputWrapper.name = name;
        $inputWrapper.id = id;

        this.name = "";
        this.id = "";

        switch (type) {
            case "text":
                this.classList.add("input-wrapper");
                $labelWrapper.classList.add(`label__${category}`);
                $inputWrapper.classList.add(`input__${category}`);
                switch (category) {
                    case "a":
                        elemArr.push($inputWrapper);
                        break;
                    case "b":
                        this.classList.add("horizontal");

                        elemArr.push($labelWrapper);
                        elemArr.push($inputWrapper);

                        break;
                    case "c":
                        // this.classList.add("vertical");
                        this.classList.add("vertical");

                        elemArr.push($labelWrapper);
                        elemArr.push($inputWrapper);

                        break;
                    default:
                        // console.log("unknown-category");
                        break;
                }
                break;
            case "password":
                break;
            case "checkbox":
                break;
            case "radio":
                break;
            case "select":
                break;
            case "date":
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
        let { value } = _params;

        if (!isTruthy(value)) {
            value = false;
        };

        try {
            if (this.shadowRoot.querySelector("input")) {
                this.shadowRoot.querySelector("input").addEventListener("input", function () {
                    // console.log(this.value);
                })
            };
        } catch (e) {
            // console.log(e);
        }


    }
}
customElements.define('custom-input', CustomInput);
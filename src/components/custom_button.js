"use strict";

/** <button is="custom-button" type="button" category="a" onclick="test()"></button>
 * 
 */
class CustomButton extends HTMLButtonElement {
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
        // this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        const moduleElement = this.setElement(attrObj);
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.append(moduleElement[i]);
            }
        };
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
        console.log(_params);
        let { type, category, text, value, id, name } = _params;
        console.log(type);
        console.log(category);
        let elemArr = new Array;

        if (isNullChecking(this.textContent)) {
            if (isNullChecking(text)) {
                text = "Button";
            };
        } else {
            if (isNullChecking(text)) {
                text = this.textContent;
            };

            this.textContent = "";
        };

        if (isNullChecking(type)) {
            type = "button";
        };

        if (isNullChecking(category)) {
            category = "a";
        };

        if (isNullChecking(id)) {
            id = `${type}_${category}_${inputCount}`;
        };

        if (isNullChecking(name)) {
            name = `${type}_${category}`;
        };

        this.classList.add(`button__${category}`);
        const $textContents = document.createElement("span");
        $textContents.textContent = text;
        elemArr.push($textContents);
        const $leftIcon = document.createElement("i");
        $leftIcon.classList.add("left-icon");
        const $rightIcon = document.createElement("i");
        $rightIcon.classList.add("right-icon");

        switch (type) {
            case "button":
                switch (category) {
                    case "a":

                        break;
                    case "b":

                        break;
                    default:
                        console.log("unknown-category");
                        break;
                }
                break;
            case "submit":
                switch (category) {
                    case "a":

                        break;
                    case "b":

                        break;
                    default:
                        console.log("unknown-category");
                        break;
                }
                break;
            default:
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
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        console.log(_params);
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});

        let { type, onclick } = _params;

        if (isNullChecking(type)) {
            type = "button";
        };

    };
};
customElements.define('custom-button', CustomButton, { extends: 'button' });
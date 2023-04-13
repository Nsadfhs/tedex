"use strict";

// input 데이터를 FormData로 전환
const inputData = new FormData();

// form쓸때, submit안하고 우리는 formdata에 넣어서 보낼거임
document.addEventListener("submit", function (e) {
    e.preventDefault();
});

/** Enter키 입력시, callback함수 발동
 * 
 * @param {*} callback 
 */
function enterSubmit(callback) {
    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            callback();
        };
    });
};

/** // 폼 안에 입력태그를 모두 찾아서 FormData형식으로 반환, name속성이 있어야 함.
 * 
 * @param {*} _target 
 */
function inputObject(_target = "") {
    const dateArray = document.querySelectorAll(`form${_target} input[type=date]`);
    const radioArray = document.querySelectorAll(`form${_target} input[type=radio]:checked`);
    const checkboxArray = document.querySelectorAll(`form${_target} input[type=checkbox]`);
    const textArray = document.querySelectorAll(`form${_target} input[type=text]`);
    const emailArray = document.querySelectorAll(`form${_target} input[type=email]`);
    const telArray = document.querySelectorAll(`form${_target} input[type=tel]`);
    const passwordArray = document.querySelectorAll(`form${_target} input[type=password]`);
    const numberArray = document.querySelectorAll(`form${_target} input[type=number]`);
    const fileArray = document.querySelectorAll(`form${_target} input[type=file]`);
    const selectArray = document.querySelectorAll(`form${_target} select`);
    const textareaArray = document.querySelectorAll(`form${_target} textarea`);

    // console.log("폼 안에 입력태그를 모두 찾아서 값을 FormData형식으로 반환");
    // console.log("**************************************************");
    // inputData = new FormData();

    for (let i = 0; i < dateArray.length; i++) {
        // console.log("날짜 입력 데이터");
        // console.log(dateArray[i]);
        // console.log(`${dateArray[i].getAttribute("id")} : ${dateArray[i].value}`);
        inputData.append(dateArray[i].getAttribute("id"), dateArray[i].value);
        // inputData.append(dateArray[i].getAttribute("id"), dateArray[i].value);
    }

    for (let i = 0; i < fileArray.length; i++) {
        // console.log("파일 입력 데이터");
        for (let j = 0; j < fileArray[i].files.length; j++) {
            // console.log(fileArray[i]);
            // console.log(`files_name : ${fileArray[i].getAttribute("name")}`);
            // console.log(`files : ${fileArray[i].files[j]}`);
            inputData.append("files", fileArray[i].files[j]);
            inputData.append("files_name", fileArray[i].getAttribute("name"));
        }
    }

    for (let i = 0; i < radioArray.length; i++) {
        // console.log("라디오 선택 데이터");
        // console.log(radioArray[i]);
        // console.log(`${radioArray[i].getAttribute("name")} : ${radioArray[i].value}`);

        if (radioArray[i].checked) {
            if (radioArray[i].value == "on") {
                // console.log(radioArray[i].getAttribute("name"), "밸류가 없습니다.")
                inputData.append(radioArray[i].getAttribute("name"), 0);
            } else {
                inputData.append(radioArray[i].getAttribute("name"), radioArray[i].value);
            }
        } else {
            inputData.append(radioArray[i].getAttribute("name"), 0);
        };
    }

    for (let i = 0; i < checkboxArray.length; i++) {
        // console.log("체크박스 선택 데이터");
        // console.log(checkboxArray[i]);
        // console.log(`${checkboxArray[i].getAttribute("name")} : ${checkboxArray[i].value}`);
        if (checkboxArray[i].checked) {
            if (checkboxArray[i].value == "on") {
                // console.log(checkboxArray[i].getAttribute("name"), "밸류가 없습니다.")
                inputData.append(checkboxArray[i].getAttribute("name"), 0);
            } else {
                inputData.append(checkboxArray[i].getAttribute("name"), checkboxArray[i].value);
            }
        } else {
            inputData.append(checkboxArray[i].getAttribute("name"), 0);
        };
    }

    for (let i = 0; i < passwordArray.length; i++) {
        // console.log("패스워드 입력 데이터");
        // console.log(passwordArray[i]);
        // console.log(`${passwordArray[i].getAttribute("name")} : ${passwordArray[i].value}`);
        inputData.append(passwordArray[i].getAttribute("name"), passwordArray[i].value);
    }

    for (let i = 0; i < textArray.length; i++) {
        // console.log("텍스트 입력 데이터");
        // console.log(textArray[i]);
        if (textArray[i].getAttribute("name") !== null) {
            // console.log(`${textArray[i].getAttribute("name")} : ${textArray[i].value}`);
            inputData.append(textArray[i].getAttribute("name"), textArray[i].value);
        }
    }

    for (let i = 0; i < telArray.length; i++) {
        // console.log("전화번호 입력 데이터");
        // console.log(telArray[i]);
        // console.log(`${telArray[i].getAttribute("name")} : ${telArray[i].value}`);
        inputData.append(telArray[i].getAttribute("name"), telArray[i].value);
    }

    for (let i = 0; i < emailArray.length; i++) {
        // console.log("이메일 입력 데이터");
        // console.log(emailArray[i])
        // console.log(`${emailArray[i].getAttribute("name")} : ${emailArray[i].value}`);
        inputData.append(emailArray[i].getAttribute("name"), emailArray[i].value);
    }

    for (let i = 0; i < textareaArray.length; i++) {
        // console.log("텍스트 에어리어 입력 데이터");
        // console.log(textareaArray[i]);
        // console.log(textareaArray[i].value);
        // console.log(`${textareaArray[i].getAttribute("name")} : ${textareaArray[i].value}`);
        inputData.append(textareaArray[i].getAttribute("name"), textareaArray[i].value);
    }

    for (let i = 0; i < selectArray.length; i++) {
        // console.log("셀렉트 입력 데이터");
        // console.log(selectArray[i]);
        // console.log(`${selectArray[i].getAttribute("name")} : ${selectArray[i].value}`);
        inputData.append(selectArray[i].getAttribute("name"), selectArray[i].value);
    }

    for (let i = 0; i < numberArray.length; i++) {
        // console.log("넘버 입력 데이터");
        // console.log(numberArray[i]);
        // console.log(`${numberArray[i].getAttribute("name")} : ${numberArray[i].value}`);
        inputData.append(numberArray[i].getAttribute("name"), numberArray[i].value);
    }

    inputData.delete("null");
    inputData.delete("");

    // console.log("**************************************************");
};

/** // 텍스트필드 값 넣기
 * 
 * @param {*} _target 
 * @param {*} _value 
 * @returns 
 */
function setTextValue(_target, _value) {
    // console.log("setTextValue", _target);
    if (_value) {
        const $targetElem = document.getElementById(_target);
        if ($targetElem) {
            if ($targetElem.tagName == "INPUT") {
                $targetElem.value = _value;
            } else if ($targetElem.tagName == "TEXTAREA") {
                $targetElem.value = _value;
            } else {
                // console.log($targetElem.tagName, "적절한 타겟이 아닙니다.(input)");
                return;
            }
        } else {
            // console.log(_target, "타겟이 없어요");
            return;
        }
    } else {
        // console.log(_target, `${_value}가 이상해요`);
        return;
    }
};

/** // 텍스트 필드 값 가져오기
 * 
 * @param {*} _target 
 * @returns 
 */
function getTextValue(_target) {
    // console.log("getTextValue", _target);
    if (_target) {
        const $targetElem = document.getElementById(_target);
        if ($targetElem) {
            return $targetElem.value;
        } else {
            // console.log(_target, "타겟이 없어요");
            return null;
        }
    }
};

/** // 텍스트 필드 값 실시간 가져오기
 * 
 * @param {*} _target 
 * @param {*} callback 
 * @returns 
 */
function watchTextValue(_target, callback = null) {
    // console.log("getTextValue", _target);
    if (_target) {
        const $targetElem = document.getElementById(_target);
        if ($targetElem) {
            $targetElem.addEventListener("keydown", function (e) {
                if (callback) {
                    callback(e.target.value);
                } else {
                    return e.target.value;
                }
            });
        } else {
            // console.log(_target, "타겟이 없어요");
            return "";
        }
    }
};

/** // 라디오버튼 알맞는 값 체크하기
 * 
 * @param {*} _target 
 * @param {*} _value 
 * @returns 
 */
function setRadioValue(_target, _value) {
    // console.log("setRadioValue", _target);
    if (_value) {
        const $targetElemArr = document.querySelectorAll(`input[name=${_target}]`);
        // console.log($targetElemArr);
        if ($targetElemArr.length !== 0) {
            for (var i = 0; i < $targetElemArr.length; i++) {
                const $targetElem = $targetElemArr[i];
                if ($targetElem.value == _value) {
                    $targetElem.checked = true;
                }
            }
        } else {
            // console.log(_target, "타겟이 없어요");
            return;
        }
    } else {
        // console.log(_target, `${_value}가 이상해요`);
        return;
    }
};

/** // 체크 해놓은 값 가져오기
 * 
 * @param {*} _target 
 * @returns 
 */
function getRadioValue(_target) {
    // console.log("getRadioValue", _target);
    const $targetElemArr = document.getElementsByName(_target);
    // console.log($targetElemArr);
    if ($targetElemArr) {
        for (var i = 0; i < $targetElemArr.length; i++) {
            const $targetElem = $targetElemArr[i];
            if ($targetElem.checked) {
                if ($targetElem.value == "on") {
                    // console.log($targetElem, "밸류가 없어요");
                    return false;
                } else {
                    return $targetElem.value;
                }
            }
        }
    } else {
        // console.log(_target, "타겟이 없어요");
        return "";
    }
};

/** // 체크 해놓은 텍스트값 가져오기
 * 
 * @param {*} _target 
 * @returns 
 */
function getRadioText(_target) {
    // console.log("getRadioValue", _target);
    const $targetElemArr = document.getElementsByName(_target);
    // console.log($targetElemArr);
    if ($targetElemArr) {
        for (var i = 0; i < $targetElemArr.length; i++) {
            const $targetElem = $targetElemArr[i];
            if ($targetElem.checked) {
                if ($targetElem.value == "on") {
                    // console.log($targetElem, "밸류가 없어요");
                    return false;
                } else {
                    return $targetElem.value;
                }
            }
        }
    } else {
        // console.log(_target, "타겟이 없어요");
        return "";
    }
};

/** // 실시간 체크 상태 확인
 * 
 * @param {*} _target 
 * @param {*} callback 
 * @returns 
 */
function watchRadioValue(_target, callback = null) {
    // console.log("getRadioValue", _target);
    const $targetElemArr = document.getElementsByName(_target);
    // console.log($targetElemArr);
    if ($targetElemArr) {
        for (var i = 0; i < $targetElemArr.length; i++) {
            const $targetElem = $targetElemArr[i];
            $targetElem.addEventListener("change", function (e) {
                // console.log($targetElem.value);
                if (e.target.value == "on") {
                    // console.log($targetElem, "밸류가 없어요");
                    return false;
                } else {
                    if (callback) {
                        callback(e.target.value);
                    } else {
                        return e.target.value;
                    }
                }
            });
        }
    } else {
        // console.log(_target, "타겟이 없어요");
        return "";
    }
};

/** // 체크박스 알맞는 값 체크하기
 * 
 * @param {*} _target 
 * @param {*} _value 
 * @returns 
 */
function setCheckboxValue(_target, _value) {
    // console.log("checkCheckboxValue", _target, _value);
    const $targetElemArr = document.querySelectorAll(`input[name='${_target}']`);
    // console.log($targetElemArr);
    if ($targetElemArr) {
        for (var i = 0; i < $targetElemArr.length; i++) {
            const $targetElem = $targetElemArr[i];
            // console.log(typeof _value);
            // console.log($targetElem.value);
            if (typeof _value === "object") {
                for (var j = 0; j < _value.length; j++) {
                    if ($targetElem.value == _value[j]) {
                        $targetElem.checked = true;
                    }
                }
            } else if (typeof _value === "string" || typeof _value === "number") {
                if ($targetElem.value == _value) {
                    $targetElem.checked = true;
                } else {
                    $targetElem.checked = false;
                }
            } else if (typeof _value === "boolean") {
                $targetElem.checked = _value;
            } else {
                // console.log(_target, `${_value}가 이상해요`);
                return;
            }
        }
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** 체크박스 값 가져오기
 * 
 * @param {*} _target 
 * @returns 
 */
function getCheckboxValue(_target) {
    // console.log("getCheckboxValue", _target);
    const $targetElemArr = document.getElementsByName(_target);
    // console.log($targetElemArr);
    if ($targetElemArr) {

        let valueArr = new Array;
        for (var i = 0; i < $targetElemArr.length; i++) {
            const $targetElem = $targetElemArr[i];
            if ($targetElemArr.length == 1) {
                if ($targetElem.checked == "on") {
                    return true;
                } else if ($targetElem.checked) {
                    return $targetElem.value;
                } else {
                    return false;
                };
            } else {
                if ($targetElem.checked == "on") {
                    return valueArr.push($targetElem.id);
                } else if ($targetElem.checked) {
                    return valueArr.push($targetElem.value);
                } else {
                    return false;
                };
            }
        };

        return valueArr;
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** 체크박스 텍스트 값 가져오기
 * 
 * @param {*} _target 
 * @returns 
 */
function getCheckboxText(_target) {
    // console.log("getCheckboxText", _target);
    const $targetElemArr = document.getElementsByName(_target);
    // console.log($targetElemArr);
    if ($targetElemArr) {
        let valueArr = new Array;
        for (var i = 0; i < $targetElemArr.length; i++) {
            const $targetElem = $targetElemArr[i];
            // console.log($targetElem);
            if ($targetElemArr.length == 1) {
                if ($targetElem.checked) {
                    return $targetElem.nextElementSibling.textContent;
                } else {
                    return false;
                }
            } else {
                if ($targetElem.checked) {
                    valueArr.push($targetElem.nextElementSibling.textContent);
                } else {
                    continue;
                }
            }
        };

        return valueArr;
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** 체크박스 실시간 값 확인하기
 * 
 * @param {*} _target 
 * @param {*} callback 
 * @returns 
 */
function watchCheckboxValue(_target, callback = null) {
    // console.log("getCheckboxValue", _target);
    const $targetElemArr = document.getElementsByName(_target);
    // console.log($targetElemArr);
    if ($targetElemArr) {
        let valueArr = new Array;
        for (var i = 0; i < $targetElemArr.length; i++) {
            const $targetElem = $targetElemArr[i];
            if ($targetElem.checked) {
                valueArr.push($targetElem.value);
            };
            $targetElem.addEventListener("change", function (e) {
                if (e.target.checked) {
                    valueArr.push(e.target.value);
                } else {
                    valueArr = valueArr.filter((element) => element !== e.target.value);
                };

                if (callback) {
                    callback(valueArr);
                } else {
                    // console.log(valueArr);
                    return valueArr;
                };
            });
        };
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** // 전체 체크 하기
 * 
 * @param {*} _target 
 * @returns 
 */
function checkAll(_target) {
    // console.log("checkAll", _target);
    if (_target) {
        const $checkAllButton = document.getElementById("check_row_all");
        // console.log($checkAllButton);
        // 체크 올!
        if ($checkAllButton) {
            $checkAllButton.addEventListener("click", function (e) {
                const $checkboxes = document.getElementsByName(_target);
                // console.log($checkboxes);
                if ($checkboxes) {
                    $checkboxes.forEach((checkbox) => {
                        // console.log(checkbox);
                        // console.log(checkbox.checked);
                        //나중에 여기 수정해야함
                        if (checkbox.checked) {
                            checkbox.checked = true;
                        } else {
                            checkbox.checked = true;
                        }
                    })
                } else {
                    // console.log(`${checkboxes}가 없습니다.`);
                }
            })
        }
    } else {
        // console.log(`check_row_all, ${_target}이 없습니다.`);
        return;
    }
};

/** // select box option 세팅하기
 * 
 * @param {*} _target 
 * @param {Object} _value 값 객체로 넘기기
 * 각 값을 data-set으로 넣고, 
 * value 키의 값은 option value로 사용
 * text 키의 값은 option text contents로 사용
 * @returns 
 */
function setSelectOption(_target, _valueArr, _default) {
    // console.log("setSelectOption", _target);
    if (_valueArr) {
        if (_valueArr[0]) {
            if (_valueArr[0].value && _valueArr[0].text) {
                const $selectElem = document.getElementById(_target);
                if ($selectElem) {
                    const $defaultOptionElem = document.createElement("option");
                    $defaultOptionElem.value = 0;
                    $defaultOptionElem.text = "선택안함";

                    $selectElem.innerHTML = `<option value="0">선택안함</option>`;

                    for (var i = 0; i < _valueArr.length; i++) {
                        const _value = _valueArr[i];
                        const $optionElem = document.createElement("option");
                        $optionElem.value = _value.value;
                        $optionElem.text = _value.text;
                        for (const [key, value] of Object.entries(_value)) {
                            if (key !== "value" || key !== "text") {
                                $optionElem.dataset[key] = value;
                            } else {
                                continue;
                            };
                        };
                        $selectElem.append($optionElem);
                    };

                    if (_default) {
                        $selectElem.value = _default;
                    } else {
                        $selectElem.value = 0;
                    }
                } else {
                    // console.log(_target, "타겟이 없어요");
                    return;
                };
            } else if (_valueArr[0].value == 0) {
                // console.log(_valueArr[0].value, "옵션의 주요 값은 0을 허용하지 않아요");
                return;
            } else if (!_valueArr[0].value) {
                // console.log(_valueArr[0].text, "옵션의 주요 값이 없어요");
                return;
            } else if (!_valueArr[0].text) {
                // console.log(_valueArr[0].text, "옵션의 텍스트가 없어요");
                return;
            }
        } else {
            // console.log(_valueArr, "옵션 생성 객체가 없어요");
            return;
        }
    } else {
        // console.log(_valueArr, "옵션 생성 배열이 없어요");
        return;
    };
};

/** // 선택한 값 selected 하기
 * 
 * @param {*} _target 
 * @param {*} _value 
 * @returns 
 */
function setSelectValue(_target, _value) {
    // console.log("setSelectValue", _target);
    if (_value == "0" || _value) {
        const $selectElem = document.getElementById(_target);
        if ($selectElem) {
            $selectElem.value = _value;
        } else {
            // console.log(_target, "타겟이 없어요");
            return;
        }
    } else {
        // console.log(_value, "가 없어요");
        return;
    }
};

/** // select 한 값 가져오기
 * 
 * @param {*} _target 
 * @returns 
 */
function getSelectValue(_target) {
    // console.log("getSelectValue", _target);
    const $selectElem = document.getElementById(_target);
    if ($selectElem) {
        return $selectElem.value;
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** // select 한 텍스트 값 가져오기
 * 
 * @param {*} _target 
 * @returns 
 */
function getSelectText(_target) {
    // console.log("getSelectText", _target);
    const $selectElem = document.getElementById(_target);
    const $optionElemArr = $selectElem.querySelectorAll("option");
    for (var i = 0; i < $optionElemArr.length; i++) {
        const $optionElem = $optionElemArr[i];
        if ($selectElem) {
            if ($selectElem.value == $optionElem.value) {
                return $optionElem.textContent;
            } else {
                continue;
            }
        } else {
            // console.log(_target, "타겟이 없어요");
            return;
        }
    }
};

/** // select 값 실시간 가져오기
 * 
 * @param {*} _target 
 * @param {*} callback 
 * @returns 
 */
function watchSelectValue(_target, callback = null) {
    // console.log("watchSelectValue", _target);
    const $selectElem = document.getElementById(_target);
    if ($selectElem) {
        $selectElem.addEventListener("change", function (e) {
            if (callback) {
                callback(e.target.value);
            } else {
                return e.target.value;
            }
        });
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** // select 텍스트 값 실시간 가져오기
 * 
 * @param {*} _target 
 * @param {*} callback 
 * @returns 
 */
function watchSelectText(_target, callback = null) {
    // console.log("watchSelectText", _target);
    const $selectElem = document.getElementById(_target);
    if ($selectElem) {
        let selectedResultObj = new Object;
        $selectElem.addEventListener("change", function (e) {
            const selectOptions = e.target.options;
            const selectedIndex = e.target.selectedIndex;
            selectedResultObj["index"] = e.target.selectedIndex;
            selectedResultObj["text"] = selectOptions[selectedIndex].text;
            selectedResultObj["value"] = selectOptions[selectedIndex].value;
            if (selectOptions[selectedIndex].dataset) {
                const selectedDataObj = JSON.parse(JSON.stringify(selectOptions[selectedIndex].dataset));
                // console.log("select", _target);
                // console.log("getSelectDataset", _target);
                for (const key in selectedDataObj) {
                    // console.log(`${key}: ${selectedDataObj[key]}`);
                    selectedResultObj[`data_${key}`] = selectedDataObj[key];
                }
            }
            if (callback) {
                callback(selectedResultObj);
            } else {
                return selectedResultObj;
            }
        });
    } else {
        // console.log(_target, "타겟이 없어요");
        return;
    }
};

/** // 타이핑 할때마다 정규식 체크하기
 * 
 * @param {*} _params 
 * target, keyword, error_message
 * // 타이핑하는 즉시 정규표현식 체킹 발동
 * typingSignCheck({ target: "input_phone", keyword: "phone_dash", error_message: "틀려먹음" });
 */
function typingSignCheck(_params) {
    // console.log("adsgsahgsa")
    const { target, keyword, error_message } = _params;
    let allCheckValid = [];

    const $inputElem = document.getElementById(target);
    // console.log($inputElem);

    let checkReg = setRegularExpression(keyword);
    if (target == "user_password_check") {
        // 비밀번호 && 비밀번호 재입력 체크
    } else {
        // 평범한 체크
        if ($inputElem) {
            $inputElem.addEventListener("keyup", function (e) {
                let value = e.target.value;
                // console.log(e.target);

                const errorMessageArr = this.parentElement.querySelectorAll(".field-message");
                // console.log(errorMessageArr);
                if (errorMessageArr) {
                    for (var i = 0; i < errorMessageArr.length; i++) {
                        const errorMessage = errorMessageArr[i];
                        errorMessage.remove();
                    }
                }

                const notifiedMessage = document.createElement("span");
                notifiedMessage.classList.add("field-message");
                notifiedMessage.textContent = error_message;
                // console.log("입력중");
                // console.log(value);
                if (value) {
                    if (value !== "") {
                        // console.log(checkReg);
                        // console.log(true);
                        // console.log(checkReg.test(value));

                        if (checkReg.test(value)) {
                            // console.log("성공");
                            this.parentElement.classList.remove("error");
                            this.parentElement.classList.add("success");
                            return true;
                        } else {
                            // console.log("실패");
                            // console.log(this.parentElement);
                            this.parentElement.classList.remove("success");
                            this.parentElement.classList.add("error");
                            this.parentElement.append(notifiedMessage);
                            return false;
                        };
                    } else {
                        // console.log("아무것도 입력안함");
                        this.parentElement.classList.remove("success");
                        this.parentElement.classList.add("error");
                        notifiedMessage.textContent = "필수 입력란입니다.";
                        this.parentElement.append(notifiedMessage);
                        return false;
                    };
                };
            });
        }
    }
};

/** // 폼 형식 맞는지 결재버튼 누를때 한번더 확인
 * 
 * @param {*} _params 
 * @returns 
 */
function signCheck(_params) {
    const { target, keyword, error_message } = _params;
    let allCheckValid = [];

    const $inputElem = document.getElementById(target);
    // console.log($inputElem);

    let checkReg = setRegularExpression(keyword);
    if (target == "user_password_check") {
        // 비밀번호 && 비밀번호 재입력 체크
    } else {
        // 평범한 체크
        if ($inputElem) {
            let value = $inputElem.value;
            // console.log(value);

            const errorMessageArr = $inputElem.parentElement.querySelectorAll(".field-message");
            // console.log(errorMessageArr);
            if (errorMessageArr) {
                for (var i = 0; i < errorMessageArr.length; i++) {
                    const errorMessage = errorMessageArr[i];
                    errorMessage.remove();
                }
            }

            const notifiedMessage = document.createElement("span");
            notifiedMessage.classList.add("field-message");
            notifiedMessage.textContent = error_message;

            if (value !== "") {
                // console.log("입력중");

                if (checkReg.test(value)) {
                    // console.log("성공");
                    $inputElem.parentElement.classList.remove("error");
                    $inputElem.parentElement.classList.add("success");
                    return true;
                } else {
                    // console.log("실패");
                    // console.log(this.parentElement);
                    $inputElem.parentElement.classList.remove("success");
                    $inputElem.parentElement.classList.add("error");
                    $inputElem.parentElement.append(notifiedMessage);
                    return false;
                }
            } else {
                // console.log("아무것도 입력안함");
                $inputElem.parentElement.classList.remove("success");
                $inputElem.parentElement.classList.add("error");
                notifiedMessage.textContent = "필수 입력란입니다.";
                $inputElem.parentElement.append(notifiedMessage);
                return false;
            };
        }
    }
};

/** 정규식 확인
 * 
 * @param {*} _params 
 * @returns 
 */
function setRegularExpression(_params) {
    // console.log(_params);
    let regExpValue = "";
    switch (_params) {
        case "_number":
            regExpValue = RegExp(/^[0-9\s]*$/);
            break;
        case "number":
            regExpValue = RegExp(/^[0-9]*$/);
            break;
        case "_korean":
            regExpValue = RegExp(/^[가-힣\s]*$/);
            break;
        case "korean":
            regExpValue = RegExp(/^[가-힣]*$/);
            break;
        case "_english":
            regExpValue = RegExp(/^[a-zA-Z\s]*$/);
            break;
        case "english":
            regExpValue = RegExp(/^[a-zA-Z]*$/);
            break;
        case "_character":
            regExpValue = RegExp(/^[가-힣A-Za-z\s]*$/);
            break;
        case "character":
            regExpValue = RegExp(/^[가-힣A-Za-z\s]*$/);
            break;
        case "special_character":
            regExpValue = RegExp(/^(?=.*[~!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?])/);
            break;
        case "contents_30":
            regExpValue = RegExp(/^[?=.*[~!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?가-힣a-zA-Z0-9\s]{2,30}$/);
            break;
        case "contents_50":
            regExpValue = RegExp(/^[?=.*[~!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?가-힣a-zA-Z0-9\s]{2,50}$/);
            break;
        case "contents_100":
            regExpValue = RegExp(/^[?=.*[~!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?가-힣a-zA-Z0-9\s]{2,100}$/);
            break;
        case "contents_200":
            regExpValue = RegExp(/^[?=.*[~!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?가-힣a-zA-Z0-9\s]{2,200}$/);
            break;
        case "email":
            regExpValue = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            break;
        case "password":
            regExpValue = RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,20}$/);
            break;
        case "company_name":
            regExpValue = RegExp(/^[가-힣0-9A-Za-z\s\.\-\(\)]{1,50}$/);
            break;
        case "name":
            // 글로벌 이름
            regExpValue = RegExp(/^[A-Za-z\s가-힣]{2,20}$/);
            break;
        case "name_kor":
            regExpValue = RegExp(/^[가-힣]{2,6}$/);
            break;
        case "name_eng":
            regExpValue = RegExp(/^[A-Za-z\s]{2,20}$/);
            break;
        case "phone":
            regExpValue = RegExp(/^01[0-9]{8}$/);
            break;
        case "phone_dash":
            regExpValue = RegExp(/^01(0|1|[6-9])-\d{3,4}-\d{4}$/);
            break;
        case "phone_divide":
            regExpValue = RegExp(/^[0-9]{3,4}$/);
            break;
        case "resident_registration_number":
            regExpValue = RegExp(/^[0-9]{6}-[1-4][0-9]{6}$/);
            break;
        case "cash_receipt_number":
            regExpValue = RegExp(/^\d{3}-\d{2}-\d{5}$/);
            break;
        default:
            break;
    }
    return regExpValue;
};

/** // // 폰번호 양식 만들기
 * //maxlength="13" 가 중요함
 * <input type="tel" name="phone" id="input_phone" maxlength="13" class="form-value check-reg"
    placeholder="'-'빼고 10~11자리 입력"> 
 *   
*/
const $inputPN = document.querySelectorAll("input[data-format='PN']");
if ($inputPN) {
    for (var i = 0; i < $inputPN.length; i++) {
        $inputPN[i].addEventListener("keyup", formatPhoneNumber);
    };

    function formatPhoneNumber() {
        this.value = this.value.replace(/[^0-9]/g, ""); // 숫자외 입력한 내용 지우기
        let inputNumber = this.value.replace(/[^0-9]/g, ""); // 길이를 알기위해 임시 저장
        let phoneNumber = ""; // 실제 폰 넘버
        if (inputNumber.length < 4) {
            return inputNumber;
        } else if (inputNumber.length < 7) {
            phoneNumber += inputNumber.substr(0, 3);
            phoneNumber += "-";
            phoneNumber += inputNumber.substr(3);
        } else if (inputNumber.length < 11) {
            phoneNumber += inputNumber.substr(0, 3);
            phoneNumber += "-";
            phoneNumber += inputNumber.substr(3, 3);
            phoneNumber += "-";
            phoneNumber += inputNumber.substr(6);
        } else if (inputNumber.length < 12) {
            phoneNumber += inputNumber.substr(0, 3);
            phoneNumber += "-";
            phoneNumber += inputNumber.substr(3, 4);
            phoneNumber += "-";
            phoneNumber += inputNumber.substr(7);
        };
        this.value = phoneNumber;
    };
};

/** // // 대한민국 주민등록번호 양식 만들기
 * 
 * 
 * <input type="text" name="RRN" maxlength="14" placeholder="주민등록번호" />
 */
const $inputRRN = document.querySelectorAll("input[data-format='RRN']");
if ($inputRRN) {
    for (var i = 0; i < $inputRRN.length; i++) {
        $inputRRN[i].addEventListener("keyup", formatResidentNumber);
    };

    function formatResidentNumber() {
        this.value = this.value.replace(/[^0-9]/g, "");
        let inputNumber = this.value.replace(/[^0-9]/g, "");
        let residentNumber = "";
        if (inputNumber.length < 6) {
            return inputNumber;
        } else if (inputNumber.length < 14) {
            residentNumber += inputNumber.substr(0, 6);
            residentNumber += "-";
            residentNumber += inputNumber.substr(6);
        }

        this.value = residentNumber;
    }
};

/** // // 대한민국 사업자 번호(개인/법인) 양식 만들기
 * 
 * 
 * <input type="text" name="RRN" maxlength="14" placeholder="주민등록번호" />
 */
const $inputBN = document.querySelectorAll("input[data-format='BN']");
if ($inputBN) {
    for (var i = 0; i < $inputBN.length; i++) {
        $inputBN[i].addEventListener("keyup", formatBusinessNumber);
    };

    function formatBusinessNumber() {
        this.value = this.value.replace(/[^0-9]/g, "");
        let inputNumber = this.value.replace(/[^0-9]/g, "");
        let businessNumber = "";
        if (inputNumber.length < 4) {
            return inputNumber;
        } else if (inputNumber.length < 7) {
            businessNumber += inputNumber.substr(0, 3);
            businessNumber += '-';
            businessNumber += inputNumber.substr(3);
        } else {
            businessNumber += inputNumber.substr(0, 3);
            businessNumber += '-';
            businessNumber += inputNumber.substr(1, 2);
            businessNumber += '-';
            businessNumber += inputNumber.substr(5);
        }

        this.value = businessNumber;
    }
};

/** 사업자 번호 검증 10자리의 {3}-{2}-{5}
 * 
 * @param {*} number 
 * @returns 
 */
function checkCorporateRegisterNumber(number) {
    var numberMap = number.replace(/-/gi, '').split('').map(function (d) {
        return parseInt(d, 10);
    });

    if (numberMap.length == 10) {
        var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
        var chk = 0;

        keyArr.forEach(function (d, i) {
            chk += d * numberMap[i];
        });

        chk += parseInt((keyArr[8] * numberMap[8]) / 10, 10);
        // console.log(chk);
        return Math.floor(numberMap[9]) === ((10 - (chk % 10)) % 10);
    }

    return false;
}
"use strict";

/**
 * 
 * @param {*} _target 
 */

function activateContent(_target) {
    console.log(_target);
    const $trigger = document.querySelector(`.tab_trigger[name="${_target}"]`);
    const $target = document.getElementById(_target);

    if ($target) {
        $trigger.classList.add("active");
        $target.classList.add("show");
    } else {
        console.log($trigger.name, "매칭실패");
    };
};

function deactivateContent(_target) {
    const $trigger = document.querySelector(`.tab_trigger[name="${_target}"]`);
    const $target = document.getElementById(_target);

    if ($target) {
        $trigger.classList.remove("active");
        $target.classList.remove("show");
    } else {
        console.log($trigger.name, "매칭실패");
    };
};

function setTabContent(_target, _default = 0, callback = null) {
    console.log(_target, "setting TabContent");
    if (_target) {
        const tabGroupObj = new Object;
        const tabNameArr = new Array;

        const $tabTriggerGroup = document.querySelectorAll(`.tab_trigger[data-group="${_target}"]`);
        console.log($tabTriggerGroup)
        if ($tabTriggerGroup.length !== 0) {
            // 초기화
            $tabTriggerGroup.forEach(element => {
                deactivateContent(element.name);
            });
            // 초기탭 활성화
            activateContent($tabTriggerGroup[_default].name);

            for (var i = 0; i < $tabTriggerGroup.length; i++) {
                const $tabTrigger = $tabTriggerGroup[i];


                $tabTrigger.addEventListener("click", function () {
                    // 초기화
                    $tabTriggerGroup.forEach(element => {
                        deactivateContent(element.name);
                    });
                    // 선택한 탭 활성화
                    activateContent(this.name);

                    if (callback) {
                        callback(this.name);

                    }
                });
            };
        } else {
            console.log(_target, "해당 타켓의 그룹이 없습니다.");
            return;
        }
    } else {
        console.log(_target, "타겟을 지정해 주세요.")
    }
};

function changeTabContent(_group, _target, _index) {
    console.log("changeTabContent", _group, _target);
    const $triggerArr = document.querySelectorAll(`.tab_trigger[data-group="${_group}"]`);
    $triggerArr.forEach(element => {
        deactivateContent(element.name);
    });
    if ($triggerArr) {
        if (_target == "index") {
            console.log($triggerArr[_index].name);
            activateContent($triggerArr[_index].name);
        } else {
            $triggerArr.forEach(element => {
                console.log(element.name);
                console.log(_target);
                if (element.name == _target) {
                    activateContent(element.name);
                };
            });
        };
    } else {
        console.log(_group, "그룹이 없습니다.");
        return;
    };
};
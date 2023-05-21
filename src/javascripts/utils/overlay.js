"use strict";

function setOverlay(_trigger, _target) {
    const SHEET_OVERLAY = _target.querySelector(".sheet-overlay");
    const DRAG_HANDLE = _target.querySelector(".overlay-handler");
    const SHEET_CONTENTS = _target.querySelector(".sheet-contents-container");
    let isGrabbing = false;
    let grabStartY;
    let grabStartHeight;

    const showOverlay = () => {
        scrollDisable();
        setDimLayer();
        _target.classList.add("show");
        if (isMobileSize) {
            updateSheetHeight(50);
        } else {
            updateSheetHeight(90);
        };
    };

    const hideOverlay = () => {
        scrollEnable();
        offDimLayer();
        _target.classList.remove("show");
    };

    _trigger.addEventListener("click", showOverlay);
    if (SHEET_OVERLAY instanceof Element) {
        SHEET_OVERLAY.addEventListener("click", hideOverlay);
    };

    const sheetGrab = (e) => {
        isGrabbing = true;
        if (!e.pageY) {
            grabStartY = e.changedTouches[0].pageY;
        } else {
            grabStartY = e.pageY;
        };
        grabStartHeight = parseInt(SHEET_CONTENTS.style.height);
        _target.classList.add("dragging");
    };

    function updateSheetHeight(_height) {
        console.log(_height);
        SHEET_CONTENTS.style.height = `${_height}vh`;
        _target.classList.toggle("full-screen", _height === 100);
    }

    const sheetDragging = (e) => {
        if (!isGrabbing) {
            return;
        };

        if (!e.pageY) {
            e.pageY = e.changedTouches[0].pageY;
        };

        const DELTA_Y = grabStartY - e.pageY;
        const NEW_HEIGHT = grabStartHeight + DELTA_Y / window.innerHeight * 100;
        updateSheetHeight(NEW_HEIGHT);
    };

    const sheetRelease = () => {
        isGrabbing = false;
        _target.classList.remove("dragging");
        const SHEET_HEIGHT = parseInt(SHEET_CONTENTS.style.height);
        // 높이에 따른 자동 사이즈 조절
        // console.log(SHEET_HEIGHT);
        SHEET_HEIGHT < 30 ? hideOverlay() : SHEET_HEIGHT > 60 ? updateSheetHeight(100) : updateSheetHeight(50);
    };

    document.addEventListener("mouseup", sheetRelease);
    document.addEventListener("touchend", sheetRelease);
    if (DRAG_HANDLE instanceof HTMLElement) {
        DRAG_HANDLE.addEventListener("mousedown", sheetGrab);
        document.addEventListener("touchstart", sheetGrab);
    };
    document.addEventListener("mousemove", sheetDragging);
    document.addEventListener("touchmove", sheetDragging);
};
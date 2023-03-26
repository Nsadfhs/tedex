"use strict";

function ajaxRequestSync(targetUrl, data, type = "POST") {
    return $.ajax({
        url: targetUrl,
        type: type,
        dataType: "json",
        data: data,
        async: false,
        beforeSend: () => {
            $(".wrap-loading").removeClass("silence");
        },
        complete: () => {
            $(".wrap-loading").addClass("silence");
        }
    })
        // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
        .fail(function (xhr, status, errorThrown) {
            alert("오류가 발생했습니다. 관리자에게 문의하여 주십시오.");
        })
        // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
        .always(function (xhr, status) {
            // // console.log("요청이 완료되었습니다!");
        });
};

function ajaxRequestAsync(targetUrl, data, type = "POST") {
    return $.ajax({
        url: targetUrl,
        type: type,
        dataType: "JSON",
        data: data,
        async: true,
        beforeSend: () => {
            $(".wrap-loading").removeClass("silence");
        },
        complete: () => {
            $(".wrap-loading").addClass("silence");
        }
    })
        // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
        .fail(function (xhr, status, errorThrown) {
            alert("오류가 발생했습니다. 관리자에게 문의하여 주십시오.");
        })
        // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
        .always(function (xhr, status) {
            // // console.log("요청이 완료되었습니다!");
        });
};

function ajaxMultipartAsync(targetUrl, type = "POST") {
    return $.ajax({
        url: targetUrl,
        enctype: "multipart/form-data",
        type: type,
        dataType: "JSON",
        data: inputData,
        processData: false,
        contentType: false,
        async: true,
        beforeSend: () => {
            $(".wrap-loading").removeClass("silence");
        },
        complete: () => {
            $(".wrap-loading").addClass("silence");
        }
    })
        // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
        .fail(function (xhr, status, errorThrown) {
            alert("오류가 발생했습니다. 관리자에게 문의하여 주십시오.");
        })
        // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
        .always(function (xhr, status) {
            // // console.log("요청이 완료되었습니다!");
        });
};

function ajaxMultipartSync(targetUrl, type = "POST") {
    return $.ajax({
        url: targetUrl,
        enctype: "multipart/form-data",
        type: type,
        dataType: "JSON",
        data: inputData,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: () => {
            $(".wrap-loading").removeClass("silence");
        },
        complete: () => {
            $(".wrap-loading").addClass("silence");
        }
    })
        // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
        .fail(function (xhr, status, errorThrown) {
            alert("오류가 발생했습니다. 관리자에게 문의하여 주십시오.");
        })
        // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
        .always(function (xhr, status) {
            // // console.log("요청이 완료되었습니다!");
        });
};

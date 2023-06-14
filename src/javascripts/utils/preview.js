"use strict";

// 새로도입하고자 하는 규칙, document element들은 변수를 구분하기 위해 $를 붙이겠다.
// $fileItem : querySelector로 불러온 input 버튼
let $albumElem = "";
const $uploadElem = document.querySelectorAll("input[type=file]");
// console.log($uploadElem);
for (var i = 0; i < $uploadElem.length; i++) {
    $uploadElem[i].addEventListener("change", handleFiles, false);
};

function handleFiles(e) {
    $albumElem = this.parentElement.parentElement;
    // console.log($albumElem);
    const fileList = this.files; /* 이제 파일 리스트로 작업할 수 있습니다 */
    const fileCount = fileList.length;
    // console.log("몇장인지", fileCount);
    // console.log(fileList);
    if (fileCount !== 0) {
        for (var i = 0; i < fileList.length; i++) {
            const imageUrl = fileList[i]

            const reader = new FileReader;
            reader.onload = (f) => {
                const $previewElem = renderPreviewImage(i, f.target.result);

                $albumElem.prepend($previewElem);
            };
            reader.readAsDataURL(imageUrl);
        };
    } else {
        // console.log("취소?");
        $albumElem.innerHTML = "";
    };


    // renderPreviewImage(i, imageUrl);
};

function renderPreviewImage(_index, _imgUrl) {
    // console.log(_index);
    // console.log(_imgUrl);
    const $frameElem = document.createElement("div");
    $frameElem.classList.add("cms-preview-a");
    const $imgElem = document.createElement("img");
    $imgElem.dataset.id = _index;
    $imgElem.src = _imgUrl;
    // return `${i}번째, ${_imgUrl}`;
    $frameElem.append($imgElem);

    // console.log($frameElem);
    return $frameElem;
}

// // 파일을 이용하기 좋게 핸들링
// function fileHandler(f) {
//     // 몇 장 인지
//     // console.log("몇장인지", f.length);
//     // 상태가 어떤지
//     // console.log(f.files);
//     // 파일종류가 뭔지

//     // console.log(f);
// }

// // 최종 행위는 컨트롤러 에서
// function fileController(files) {
//     // console.log(files);
//     // 서버와의 접촉시 어떤 행위를 진행할 것인지 (삽입, 수정, 삭제)
//     // 타켓 디비 테이블과 디비 로우 index 

//     switch (action) {
//         case "insert":

//             // console.log("삽입 완료");

//             break;
//         case "update":
//             // 업데이트 시에는 타겟이 필요함
//             // console.log("파일 업데이트");
//             break;
//         case "delete":
//             // 삭제시에는 타겟이 필요함
//             // console.log("파일 삭제");
//             break;
//         default:
//             break;

//     }
// }

function heicToJpgConverter() {
    const diaryImg = document.getElementById("cultivation_image");

    for (var i = 0; i < diaryImg.files.length; i++) {
        // console.log(diaryImg.files[i]);
        inputData.append("files_name", "cultivation_image");
        inputData.append("files", diaryImg.files[i]);
    }


    ajaxMultipartAsync(`${baseURL}/${apiVesion1}/farm/cultivation/diary/img/check`)
        .done(function (results) {
            // console.log(results);
            if (results.Status == 200) {
                alert("정상적으로 유저를 저장했습니다.");
                // location.reload();
            }
        })
}
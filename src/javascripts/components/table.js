"use strict";

// 새로운 규칙에 의해 element를 의미하는 변수는 $를 붙임

// // 기준 인덱스
// current_index = 0;
// // 이동할 인덱스
// change_index = 0;
// 보여줄 페이지 링크 최대 갯수 : 한 화면에 나타낼 페이지링크 갯수
const AMOUNT_INDEX = 8;

/**
 * 
 * 1. 총 데이터 갯수 - 필요한 페이지 총 갯수를 구할 수 있다.
 * 2. 페이지 총 갯수가 AMOUNT_INDEX보다 작으면, 페이지 앞 뒤로 버튼은 필요없다.
 * 3. 페이지 총 갯수가 AMOUNT_INDEX보다 크면, 이전 페이지, 다음 페이지버튼이 필요하다.
 * 4. 처음으로 끝으로 버튼을 이용하면 기준이 바뀐다. 제한 갯수가 4개인데, 총 페이지 갯수가 5라면 1 2 3 4 페이지와 5 페이지가 나온다.
 * 
 */

// 페이지네이션 연산 함수
/**
 * 페이지 링크가 몇개 필요한지
 * @param {*} 처음인지 아닌지
 * @param {*} callback 
 */
// 페이지 렌더링 함수
/**
 * 
 * @param {*} paging_ends 페이징 처음인지 끝인지 
 * @param {*} totalPages 총 페이지 갯수
 * @param {*} jump_pages 페이지 이동이 필요한지 
 * @param {*} callback
 */

function setPagination(info, callback) {
    console.log("------------info------------");
    console.log(info);
    console.log("------------info------------");

    let totalPages = info.page_index;
    // console.log("페이지 총갯수 totalPages", totalPages);
    let currentIndex = Number(info.page_offset) + 1;
    // console.log("현재 페이지 currentIndex", currentIndex);

    /*
        총 페이지 수 = Math.ceil(전체 개수/ 한 페이지에 나타낼 데이터 수);
        화면에 보여질 페이지 그룹 = Math.ceil(현재 페이지/ 한 화면에 나타낼 페이지 수);
     */

    let pageGroupLength = Math.ceil(totalPages / AMOUNT_INDEX);
    // console.log("총 페이지 그룹 갯수 pageGroupLength", pageGroupLength);
    let currentPage = Math.ceil(currentIndex / AMOUNT_INDEX);
    // console.log("화면에 보여질 페이지 그룹 currentPage", currentPage);
    // // console.log(currentPage);

    /*
    화면에 그려질 첫 번째 페이지: 화면에 그려질 마지막 페이지 - (AMOUNT_INDEX - 1)
        (단, 계산된 값이 0 이하이면 첫번째 페이지는 1이다.)

    화면에 그려질 마지막 페이지: 화면에 보여질 페이지 그룹 * 한 화면에 나타낼 페이지
        (단, 계산된 값이 총 페이지수보다 많으면 마지막 페이지는 은 총 페이지 수이다.)
*/

    let stepLast = currentPage * AMOUNT_INDEX;
    // // console.log("화면에 보여질 마지막 페이지 stepLast", stepLast);
    // 끝 페이지 그룹이면 마지막 번호는 총페이지 갯수와 같다.

    let stepFirst = stepLast - (AMOUNT_INDEX - 1);
    // // console.log("화면에 보여질 첫번째 페이지 stepFirst", stepFirst);
    if (stepFirst == 0) {
        stepFirst = 1;
    }

    if (currentPage == pageGroupLength) {
        stepLast = totalPages;
    }

    let pagination = `
        <button type="button" id="paging_first" class="paging-jump__first"></button>
        <button type="button" id="paging_prev" class="paging-jump__prev"></button>
        <ul class="paging-index-list">
    `;

    if (totalPages > 1) {
        // // console.log(stepFirst);
        // // console.log(stepLast);
        // // console.log("여러개");
        for (var i = stepFirst - 1; i < stepLast; i++) {
            // // console.log(i)
            if (info.page_offset == i) {
                pagination += `
                        <li data-index="${i}" class="paging-index-item active">${i + 1}</li>
                    `;
            } else {
                pagination += `
                        <li data-index="${i}" class="paging-index-item">${i + 1}</li>
                `;
            };
        };
    }

    pagination += `
        </ul>
        <button type="button" id="paging_next" class="paging-jump__next"></button>
        <button type="button" id="paging_last" class="paging-jump__last"></button>
    `;

    const paginationWrapper = document.querySelector(`#pagination_${info.target}`);

    if (paginationWrapper) {
        paginationWrapper.innerHTML = pagination;

        if (totalPages <= 1) {
            paginationWrapper.style = "display:none";
            return;
        } else {
            paginationWrapper.style = "display:flex";
        };
    } else {
        console.log("타겟이 없어요.", info.target);
    };

    // "끝 페이지 그룹이면 다음 페이지는 없다.
    if (currentPage !== pageGroupLength) {
        let nextPage = document.querySelector(`#pagination_${info.target} #paging_next`);
        nextPage.classList.add("visible");
        // console.log(nextPage);
        if (nextPage) {
            nextPage.addEventListener("click", function (e) {
                let index = stepLast;
                callback(index);
            });
        }
    }
    // 현재 페이지가 1페이지면 이전 페이지는 없다
    if (currentPage !== 1) {
        let prevPage = document.querySelector(`#pagination_${info.target} #paging_prev`);
        prevPage.classList.add("visible");
        // console.log(prevPage);
        if (prevPage) {
            prevPage.addEventListener("click", function () {
                let index = stepFirst - (AMOUNT_INDEX - 1);
                callback(index);
            })
        }
    };

    // 첫 페이지면 처음으로 버튼은 안보이기
    if (currentIndex > 1) {
        let prevFirst = document.querySelector(`#pagination_${info.target} #paging_first`);
        prevFirst.classList.add("visible");
        // console.log(prevFirst);
        if (prevFirst) {
            prevFirst.addEventListener("click", function (e) {
                let index = 0;
                callback(index);
            });
        };
    };

    // 마지막 페이지면 끝으로 버튼은 안보이기
    if (currentIndex !== totalPages) {
        let nextLast = document.querySelector(`#pagination_${info.target} #paging_last`);
        nextLast.classList.add("visible");
        // console.log(nextLast);
        if (nextLast) {
            nextLast.addEventListener("click", function (e) {
                let index = totalPages - 1;
                callback(index);
            });
        };
    };

    let paginationIndicator = document.querySelectorAll(`#pagination_${info.target} .paging-index-item`);
    for (var i = 0; i < paginationIndicator.length; i++) {
        // // console.log(paginationIndicator[i])
        paginationIndicator[i].addEventListener("click", function (e) {
            // // console.log(e.target.dataset.index);
            let index = e.target.dataset.index;
            callback(index);
        });
    };
}


// function setPaginationTemplate(info, callback)
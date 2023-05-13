"use strict";

class Calendar {
    constructor({
        element,
        defaultDate,
        exclusionDate,
        selectedDate,
    }) {
        if (element instanceof HTMLElement) {
            this._element = element;
        } else {
            throw new Error("엘리먼트가 없음");
        };

        if (defaultDate instanceof Date) {
            this._defaultDate = defaultDate;
        } else {
            this._defaultDate = new Date();
        };

        this.init();
    }

    _year;
    _month;
    _date;
    _dateString;
    _calendarCell;

    init = () => {

        const DEFAULT_YEAR = this._defaultDate.getFullYear();
        const DEFAULT_MONTH = this._defaultDate.getMonth() + 1;
        const DEFAULT_DATE = this._defaultDate.getDate();
        this._setDate(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DATE);
        this._listenEvents();
        this._calendarCell = new Object;
    };

    // 특정 버튼 클릭 시, 해당 이벤트 발동
    _listenEvents = () => {
        const LAST_YEAR_BUTTON = this._element.querySelector("#jump_previous_year");
        const LAST_MONTH_BUTTON = this._element.querySelector("#jump_previous_month");
        const NEXT_MONTH_BUTTON = this._element.querySelector("#jump_next_month");
        const NEXT_YEAR_BUTTON = this._element.querySelector("#jump_next_year");
        const DATE_BUTTON = this._element;

        if (LAST_YEAR_BUTTON instanceof Element) {
            LAST_YEAR_BUTTON.addEventListener("click", () => {
                this._year--;
                this._setDate(this._year, this._month);
            });
        };

        if (LAST_MONTH_BUTTON instanceof Element) {
            LAST_MONTH_BUTTON.addEventListener("click", () => {
                if (this._month === 1) {
                    this._month = 12;
                    this._year--;
                } else {
                    this._month--;
                };
                this._setDate(this._year, this._month);
            });
        };

        if (NEXT_MONTH_BUTTON instanceof Element) {
            NEXT_MONTH_BUTTON.addEventListener("click", () => {
                if (this._month === 12) {
                    this._month = 1;
                    this._year++;
                } else {
                    this._month++;
                };
                this._setDate(this._year, this._month);
            });
        };

        if (NEXT_YEAR_BUTTON instanceof Element) {
            NEXT_YEAR_BUTTON.addEventListener("click", () => {
                this._year++;
                this._setDate(this._year, this._month);
            });
        };

        DATE_BUTTON.addEventListener("click", (e) => {
            if (e.target.classList.contains("current-month")) {
                console.log(e.target.dataset);

                const PARSE_DATE = e.target.dataset.date.split('-').map(str => parseInt(str, 10));
                console.log(PARSE_DATE);
            };
        });
    }

    // 달력을 만듦
    _setDate = (year, month, date) => {
        this._year = year;
        this._month = month;
        this._date = date;
        this._renderIndicator();
        this._renderCurrentDate();
        this._renderDates();
    };

    // 인디케이터 중앙에 오늘 날짜 띄우기
    _renderIndicator = () => {
        const CURRENT_DATE_ELEM = this._element.querySelector("#current_date");
        this._dateString = this._getDateString(this._year, this._month);
        CURRENT_DATE_ELEM.textContent = this._dateString;
    };

    // 인디케이터 중앙에 오늘 날짜 띄우기
    _renderCurrentDate = () => {
        const CURRENT_DATE_ELEM = this._element.querySelector("#current_date");
        this._dateString = this._getDateString(this._year, this._month);
        CURRENT_DATE_ELEM.textContent = this._dateString;
    };

    _formatDateString = (date) => {
        return date < 10 ? `0${date}` : date;
    };

    // 날짜 스트링 포맷
    _getDateString = (year, month, date) => {
        if (date) {
            return `${year}-${this._formatDateString(month)}-${this._formatDateString(date)}`;
        } else {
            return `${year}-${this._formatDateString(month)}`;
        };
    };

    // 날짜 렌더링
    _renderDates = () => {
        const DATES_ELEM = this._element.querySelector("#calendar_dates_wrap");
        DATES_ELEM.innerHTML = ``;

        const DAY_COUNT_IN_CURRENT_MONTH = this._getDayCount(this._year, this._month);
        console.log("DAY_COUNT_IN_CURRENT_MONTH", DAY_COUNT_IN_CURRENT_MONTH);
        const FIRST_DAY_IN_CURRENT_MONTH = this._getFirstDay();
        console.log("FIRST_DAY_IN_CURRENT_MONTH", FIRST_DAY_IN_CURRENT_MONTH);
        const { lastMonth, yearOfLastMonth, DAY_COUNT_OF_LAST_MONTH } = this._getLastMonthInfo();
        const { nextMonth, yearOfNextMonth, DAY_COUNT_IN_NEXT_MONTH } = this._getNextMonthInfo();

        for (let i = 1; i <= 42; i++) {
            const DATE_ELEM = document.createElement("button");
            DATE_ELEM.classList.add("calendar-column", "dates");
            let date;
            let dateString;
            if (FIRST_DAY_IN_CURRENT_MONTH > 1 && i < FIRST_DAY_IN_CURRENT_MONTH) {
                // 앞에 지난 달 마지막 주 날짜 채우기
                date = DAY_COUNT_OF_LAST_MONTH - (FIRST_DAY_IN_CURRENT_MONTH - i) + 1;
                dateString = this._getDateString(yearOfLastMonth, lastMonth, date);
                DATE_ELEM.classList.add("last-month");
            } else if (i >= DAY_COUNT_IN_CURRENT_MONTH + FIRST_DAY_IN_CURRENT_MONTH) {
                // 마지막에 다음 달 첫 주 날짜 채우기
                date = i - (DAY_COUNT_IN_CURRENT_MONTH + FIRST_DAY_IN_CURRENT_MONTH) + 1;
                dateString = this._getDateString(yearOfNextMonth, nextMonth, date);
                DATE_ELEM.classList.add("next-month");
            } else {
                // 남은 공간에 이번 달 날짜 넣기
                date = i - FIRST_DAY_IN_CURRENT_MONTH + 1;
                dateString = this._getDateString(this._year, this._month, date);
                DATE_ELEM.classList.add("current-month");
                if (date === this._date) {
                    DATE_ELEM.classList.add("current-date");
                }
            };

            // this._getSunday(this._year, this._month, date);
            // this._getSaturday(this._year, this._month, date);

            DATE_ELEM.textContent = date;
            DATE_ELEM.dataset.date = dateString;
            DATES_ELEM.append(DATE_ELEM);
            this._calendarCell[dateString] = DATE_ELEM;
        };
    };

    // 이전 달 정보 가져오기
    _getLastMonthInfo = () => {
        let lastMonth = this._month - 1;
        let yearOfLastMonth = this._year;
        if (lastMonth === 0) {
            lastMonth = 12;
            yearOfLastMonth -= 1;
        };

        const DAY_COUNT_OF_LAST_MONTH = this._getDayCount(yearOfLastMonth, lastMonth);
        return {
            lastMonth,
            yearOfLastMonth,
            DAY_COUNT_OF_LAST_MONTH
        };
    };

    // 다음 달 정보 가져오기
    _getNextMonthInfo = () => {
        let nextMonth = this._month + 1;
        let yearOfNextMonth = this._year;
        if (nextMonth === 13) {
            nextMonth = 1;
            yearOfNextMonth += 1;
        };

        const DAY_COUNT_IN_NEXT_MONTH = this._getDayCount(yearOfNextMonth, nextMonth);

        return {
            nextMonth,
            yearOfNextMonth,
            DAY_COUNT_IN_NEXT_MONTH
        };
    };

    /** 이번 달 날짜 갯수 헤아리기
     * @param {number} year
     * @param {number} month
     * @returns
     * */
    _getDayCount = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    // 이번 달 시작 요일 알아내기
    _getFirstDay = () => {
        let day = new Date(this._year, this._month - 1, 1).getDay();
        console.log(day);
        console.log(day + 1);
        console.log(day + 8);
        return day === 0 ? 7 : day + 1;
    };

    // 이번 달 일요일 알아내기
    _getSunday = () => {
        let day = new Date(this._year, this._month - 1, 1).getDay();
        console.log(day);
    };

    // 이번 달 토요일 알아내기
    _getSaturday = () => {
        let day = new Date(this._year, this._month - 1, 1).getDay();
        console.log(day);
    };

    // 이번 달 공휴일 체킹 하기
    _getHoliday = () => {
        let day = new Date(this._year, this._month - 1, 1).getDay();
        console.log(day);
    };

    _getCalendarCell = () => {
        console.log(this._calendarCell);
        return this._calendarCell;
    };
};
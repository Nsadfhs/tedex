"use strict";

class Calendar {
    constructor({ element, defaultDate, period, startAt, endAt }) {
        if (element instanceof HTMLElement) {
            this.element = element;
        } else {
            throw new Error("엘리먼트가 없음");
        };

        if (isFalsy(defaultDate)) {
            this.defaultDate = new Date();
        } else {
            if (new Date(defaultDate) instanceof Date) {
                this.defaultDate = new Date(defaultDate);
            } else {
                this.defaultDate = new Date();
            };
        };

        this.period = period || null;
        this.startAt = startAt || null;
        this.endAt = endAt || null;
        this.year;
        this.month;
        this.date;
        this.dateString;
        this.calendarCell;
        this.dateArray = new Array;
        this.init();
    };

    init = () => {
        const DEFAULT_YEAR = this.defaultDate.getFullYear();
        const DEFAULT_MONTH = this.defaultDate.getMonth() + 1;
        const DEFAULT_DATE = this.defaultDate.getDate();
        this.setDate(DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DATE);
    };

    // 월 이동 버튼 클릭 시, 해당 이벤트 발동
    jumpMonth = (_direction, callback) => {
        if (_direction == "jump_previous_month") {
            if (this.month === 1) {
                this.month = 12;
                this.year--;
            } else {
                this.month--;
            };
            this.setDate(this.year, this.month, this.date);
        } else if (_direction == "jump_next_month") {
            if (this.month === 12) {
                this.month = 1;
                this.year++;
            } else {
                this.month++;
            };

            this.setDate(this.year, this.month, this.date);
        };
        if (callback) {
            callback();
        } else {
            return this.getDateString(this.year, this.month);
        };
    };

    // 달력을 만듦
    setDate = (_year, _month, _date) => {
        this.dateArray.length = 0;
        this.year = _year;
        this.month = _month;
        this.date = _date;
        this.renderCurrentDate();
        this.renderDates();
    };

    // 인디케이터 중앙에 오늘 날짜 띄우기
    renderCurrentDate = () => {
        const $CURRENT_DATE = this.element.querySelector("#current_date");
        this.dateString = this.getDateString(this.year, this.month);
        $CURRENT_DATE.textContent = this.dateString;
    };

    // 넘버 포맷
    formatDateString = (_number) => {
        return _number < 10 ? `0${_number}` : _number;
    };

    // 날짜 스트링 포맷
    getDateString = (_year, _month, _date) => {
        if (isFalsy(_year)) {
            if (isFalsy(_date)) {
                return `${this.formatDateString(_month)}`;
            } else {
                return `${this.formatDateString(_month)}-${this.formatDateString(_date)}`;
            };
        } else {
            if (isFalsy(_date)) {
                return `${this.formatDateString(_year)}-${this.formatDateString(_month)}`;
            } else {
                return `${this.formatDateString(_year)}-${this.formatDateString(_month)}-${this.formatDateString(_date)}`;
            };
        };
    };

    // 날짜 렌더링
    renderDates = () => {
        const $DATES = this.element.querySelector("#calendar_dates_wrap");
        $DATES.innerHTML = ``;

        const DAY_COUNT_IN_CURRENT_MONTH = this.getDayCount(this.year, this.month);
        const FIRST_DAY_IN_CURRENT_MONTH = this.getFirstDay();
        const { lastMonth, yearOfLastMonth, DAY_COUNT_OF_LAST_MONTH } = this.getLastMonthInfo();
        const { nextMonth, yearOfNextMonth, DAY_COUNT_IN_NEXT_MONTH } = this.getNextMonthInfo();

        if (isFalsy(this.startAt)) {
            this.startAt = this.getDateString(this.year, this.month, '1');
        };
        if (isFalsy(this.endAt)) {
            const { currentMonth, yearOfCurrentMonth, DAY_COUNT_OF_CURRENT_MONTH } = this.getCurrentMonthInfo();

            this.endAt = this.getDateString(this.year, this.month, DAY_COUNT_OF_CURRENT_MONTH);
        };
        if (isFalsy(this.period)) {
            this.getPeriodCount(this.startAt, this.endAt);
        };

        this.calendarCell = new Object;

        if (isFalsy(this.period)) {
            this.period = 42;
        };

        for (let i = 1; i <= this.period; i++) {
            const $DATE = document.createElement("section");
            $DATE.classList.add("calendar-column", "dates");
            if (FIRST_DAY_IN_CURRENT_MONTH > 1 && i < FIRST_DAY_IN_CURRENT_MONTH) {
                // 앞에 지난 달 마지막 주 날짜 채우기
                this.date = DAY_COUNT_OF_LAST_MONTH - (FIRST_DAY_IN_CURRENT_MONTH - i) + 1;
                this.dateString = this.getDateString(yearOfLastMonth, lastMonth, this.date);
                $DATE.classList.add("last-month");
                $DATE.textContent = this.getDateString("", lastMonth, this.date);
            } else if (i >= DAY_COUNT_IN_CURRENT_MONTH + FIRST_DAY_IN_CURRENT_MONTH) {
                // 마지막에 다음 달 첫 주 날짜 채우기
                this.date = i - (DAY_COUNT_IN_CURRENT_MONTH + FIRST_DAY_IN_CURRENT_MONTH) + 1;
                this.dateString = this.getDateString(yearOfNextMonth, nextMonth, this.date);
                $DATE.classList.add("next-month");
                $DATE.textContent = this.getDateString("", nextMonth, this.date);
            } else {
                // 남은 공간에 이번 달 날짜 넣기 / 동시에 버튼 띄우기
                this.date = i - FIRST_DAY_IN_CURRENT_MONTH + 1;
                this.dateString = this.getDateString(this.year, this.month, this.date);
                $DATE.classList.add("current-month");
                $DATE.textContent = this.date;
                if (this.dateString === this.getToday()) {
                    $DATE.classList.add("current-date");
                };
            };

            if (new Date(this.dateString) < new Date(this.startAt)) {
                // 지정한 날보다 작으면 주문 불가능
                $DATE.classList.add("disabled");
            } else if (new Date(this.endAt) < new Date(this.dateString)) {
                // 지정한 날보다 크면 주문 불가능
                $DATE.classList.add("disabled");
            } else {
                // 지정한 날들만 주문 가능
                $DATE.classList.add("enabled");
            };

            // $DATE.textContent = this.date;
            $DATE.dataset.date = this.dateString;
            $DATES.append($DATE);

            this.calendarCell[this.dateString] = $DATE;
            this.dateArray.push(this.dateString);
        };
    };

    // 이전 달 정보 가져오기
    getLastMonthInfo = () => {
        let lastMonth = this.month - 1;
        let yearOfLastMonth = this.year;
        if (lastMonth === 0) {
            lastMonth = 12;
            yearOfLastMonth -= 1;
        };

        const DAY_COUNT_OF_LAST_MONTH = this.getDayCount(yearOfLastMonth, lastMonth);
        return {
            lastMonth,
            yearOfLastMonth,
            DAY_COUNT_OF_LAST_MONTH
        };
    };

    // 다음 달 정보 가져오기
    getNextMonthInfo = () => {
        let nextMonth = this.month + 1;
        let yearOfNextMonth = this.year;
        if (nextMonth === 13) {
            nextMonth = 1;
            yearOfNextMonth += 1;
        };

        const DAY_COUNT_IN_NEXT_MONTH = this.getDayCount(yearOfNextMonth, nextMonth);

        return {
            nextMonth,
            yearOfNextMonth,
            DAY_COUNT_IN_NEXT_MONTH
        };
    };

    // 현재 월 정보 가져오기
    getCurrentMonthInfo = () => {
        let currentMonth = this.month;
        let yearOfCurrentMonth = this.year;

        const DAY_COUNT_OF_CURRENT_MONTH = this.getDayCount(yearOfCurrentMonth, currentMonth);
        // console.log(DAY_COUNT_OF_CURRENT_MONTH)
        return {
            currentMonth,
            yearOfCurrentMonth,
            DAY_COUNT_OF_CURRENT_MONTH
        };
    };

    /** 이번 달 날짜 갯수 헤아리기
     * @param {number} _year
     * @param {number} _month
     * @returns
     * */
    getDayCount = (_year, _month) => {
        return new Date(_year, _month, 0).getDate();
    };

    getPeriodCount(start_date, end_date) {
        // 날짜 객체로 변환
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        // 날짜 간의 차이 계산 (밀리초 단위)
        const timeDiff = endDate.getTime() - startDate.getTime();

        // 일 단위로 변환
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // 날짜 개수 반환
        return dayDiff;
    }

    // 이번 달 시작 요일 알아내기
    getFirstDay = () => {
        let day = new Date(this.year, this.month - 1, 1).getDay();
        return day === 0 ? 7 : day + 1;
    };

    // 이번 달 일요일 알아내기
    getSunday = () => {
        let day = new Date(this.year, this.month - 1, 1).getDay();
    };

    getToday = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDate()).padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    getCalendarCell = (_dateString) => {
        if (isFalsy(_dateString)) {
            return this.calendarCell;
        } else {
            return this.calendarCell[_dateString];
        }
    };

    getDateArray = () => {
        return this.dateArray
    };
};
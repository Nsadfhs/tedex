// 소수점 원하는 자리수로 반올림
function roundFloat(floatNumber, digits) {
    let roundedRange = 10 ** digits;

    let roundedNumber = Math.round((floatNumber) * roundedRange) / roundedRange;

    return roundedNumber
};

// 백분율 구하기
function calcPercentage(totalValue, PartialValue) {
    let percentageRate = 0;
    if (PartialValue >= totalValue) {
        percentageRate = (totalValue / PartialValue) * 100;
    } else {
        percentageRate = (PartialValue / totalValue) * 100;
    }
    return roundedFloat(percentageRate, 4);
};

// 할인율 계산기
function calcDiscountRate(productPrice, discountPrice) {
    let discountRate = 0;
    if (productPrice >= discountPrice) {
        discountRate = ((productPrice - discountPrice) / productPrice) * 100;
    } else {
        discountRate = ((discountPrice - productPrice) / discountPrice) * 100;
    }
    return discountRate;
};

// 적립금 계산
function calcMileage(price, savingRate) {
    let formatPrice = roundFloat(price, 0);
    let savingPoint = Math.floor(formatPrice * savingRate);
    return roundFloat(savingPoint, 0);
};

// 회계처럼 숫자에 ','를 3자리수마다 삽입해줌 
function numberToComma(_number) {
    if (_number == null || isNaN(_number) || !isFinite(_number)) {
        return "";
    }
    const number = Number(_number);
    if (number < 0) {
        return "-" + numberToComma(-number);
    }
    const [integer, decimal] = number.toString().split(".");
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal ? formattedInteger + "." + decimal.slice(0, 2) : formattedInteger;
};

// 회계로 된 숫자 스트링을 다시 number형으로 만들어줌
function commaToNumber(_stringNumber) {
    if (typeof _stringNumber !== "string") {
        return null;
    }
    const number = Number(_stringNumber.replace(/,/g, ""));
    return isNaN(number) ? null : number;
};

// 글자색을 배경색에 맞춰줌 -> 보색계산
function calcRGBColorComplement(color) {
    let _color = color.split("(")[1].replace(")", "");
    let rgbArray = _color.split(",");
    let compColor = "rgba(";
    for (let i = 0; i < rgbArray.length; i++) {
        if (i == 3) {
            compColor += `${1 - Number(rgbArray[i])}, `;
        } else {
            compColor += `${255 - Number(rgbArray[i])}, `;
        }
    }

    compColor = compColor.slice(0, -2);
    compColor += ")";
    return compColor;
}
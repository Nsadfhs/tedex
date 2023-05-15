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
    let dicountRate = 0;
    if (productPrice >= discountPrice) {
        dicountRate = ((productPrice - discountPrice) / productPrice) * 100;
    } else {
        dicountRate = ((discountPrice - productPrice) / discountPrice) * 100;
    }
    return dicountRate;
};

// 적립금 계산
function calcMileage(price, savingRate) {
    let formatPrice = roundFloat(price, 0);
    let savingPoint = Math.floor(formatPrice * savingRate);
    return roundFloat(savingPoint, 0);
};

// 회계처럼 3자리마다 , 추가
function numberToComma(x) {
    if (x == null) {
        x = 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 회계처럼 된 문자열 숫자를 int형으로 다시 반환
function CommaToNumber(stringNumber) {
    if (!stringNumber) {
        stringNumber = 0;
    }
    return parseInt(stringNumber.replace(/,/g, ''));
}

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
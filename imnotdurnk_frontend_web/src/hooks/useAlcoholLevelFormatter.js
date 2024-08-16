// alcoholLevel 숫자 -> string 설명으로 변환
const alcoholLevelToString = (alcoholLevel) => {
    switch (alcoholLevel) {
        case 1:
            return '1: 살짝 취함';
        case 2:
            return '2: 기분 좋게 취함';
        case 3:
            return '3: 만취';
        default:
            return '0: 취하지 않음';
    }
};

export { alcoholLevelToString };

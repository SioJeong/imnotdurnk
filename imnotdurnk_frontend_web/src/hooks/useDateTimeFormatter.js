// new Date() -> 2024년 8월 5일 형식으로 변환
const convertDateToString = (date) => {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// new Date() -> 오후 01시 32분 형식으로 변환
const convertTimeToString = (time) => {
    let hour = time.getHours();
    let minute = time.getMinutes();
    let period = hour >= 12 ? '오후' : '오전';
    hour = hour % 12 || 12;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    return `${period} ${hour}시 ${minute}분`;
};

// backend 요청 형식에 따라 전송할 데이터 변환 (yyyy-MM-ddThh:ss 형식의 문자열)
// dateString 형식: 2024년 8월 5일
// timeString 형식: 오후 01시 32분
const parseDateTime = (dateString, timeString) => {
    const [year, month, day] = dateString
        .replace('년', '')
        .replace('월', '')
        .replace('일', '')
        .split(' ')
        .map((item) => item.trim());

    const [ampm, hourStr, minuteStr] = timeString.split(' ');
    let hour = parseInt(hourStr.split('시')[0], 10);
    const minute = minuteStr.split('분')[0];

    if (ampm === '오후' && hour !== 12) {
        hour += 12;
    } else if (ampm === '오전' && hour === 12) {
        hour = 0;
    }

    return `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${minute.padStart(2, '0')}`;
};

// backend 요청 형식에 따라 전송할 데이터 변환 (00:00:00 형식의 문자열)
// timeString 형식: 오후 10시 00분
const parseTime = (timeString) => {
    const [ampm, hourStr, minuteStr] = timeString.split(' ');
    let hour = parseInt(hourStr.split('시')[0], 10);
    const minute = minuteStr.split('분')[0];

    if (ampm === '오후' && hour !== 12) {
        hour += 12;
    } else if (ampm === '오전' && hour === 12) {
        hour = 0;
    }

    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');

    return `${formattedHour}:${formattedMinute}:00`;
};

// backend에서 받아온 데이터 frontend 형식으로 변환 (오후 10시 00분)
// timeString 형식: 00:00:00 형식의 문자열
const formatTime = (timeString) => {
    const [hourStr, minuteStr] = timeString.split(':');
    let hour = parseInt(hourStr, 10);
    let ampm = '오전';

    if (hour >= 12) {
        ampm = '오후';
        if (hour > 12) {
            hour -= 12;
        }
    } else if (hour === 0) {
        hour = 12;
    }

    const formattedHour = hour.toString();
    const formattedMinute = minuteStr.padStart(2, '0');

    return `${ampm} ${formattedHour}시 ${formattedMinute}분`;
};

export {
    convertDateToString,
    convertTimeToString,
    formatTime,
    parseDateTime,
    parseTime,
};

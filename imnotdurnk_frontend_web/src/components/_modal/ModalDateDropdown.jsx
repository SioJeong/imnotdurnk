import { useState } from 'react';
import DropButton from '../_button/DropButton';
import * as St from './Modal.style';

const ModalDateDropdown = ({ handleSelectedDate }) => {
    const years = Array.from({ length: 10 }, (_, i) => `${2020 + i}년`);
    const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    const days = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

    // TODO: 코드로 변경해야 함 (CreatePlan 연동)
    const [selectedYear, setSelectedYear] = useState(years[4]);
    const [selectedMonth, setSelectedMonth] = useState(months[7]);
    const [selectedDay, setSelectedDay] = useState(days[2]);

    // 드롭다운에서 선택된 값을 콜백 함수로 전달
    const handleSelectYear = (option) => {
        setSelectedYear(option);
        handleSelectedDate(option, selectedMonth, selectedDay);
    };

    const handleSelectMonth = (option) => {
        setSelectedMonth(option);
        handleSelectedDate(selectedYear, option, selectedDay);
    };

    const handleSelectDay = (option) => {
        setSelectedDay(option);
        handleSelectedDate(selectedYear, selectedMonth, option);
    };

    return (
        <St.StyledBox>
            <St.StyledFormBox $direction="row">
                <DropButton
                    options={years}
                    onSelect={handleSelectYear}
                    originValue={selectedYear}
                />
                <DropButton
                    options={months}
                    onSelect={handleSelectMonth}
                    originValue={selectedMonth}
                />
                <DropButton
                    options={days}
                    onSelect={handleSelectDay}
                    originValue={selectedDay}
                />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalDateDropdown;

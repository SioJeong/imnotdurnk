import { useState } from 'react';
import DropButton from '../../components/_button/DropButton';
import * as St from './Modal.style';

const ModalDropdown = ({ handleTime }) => {
    const ampm = ['오전', '오후'];
    const hours = [];
    const minutes = [];

    for (let i = 1; i <= 12; i++) {
        hours.push(`${String(i).padStart(2, '0')}시`);
    }

    for (let i = 0; i < 60; i++) {
        minutes.push(`${String(i).padStart(2, '0')}분`);
    }

    const [selectedAmpm, setSelectedAmpm] = useState(ampm[0]);
    const [selectedHour, setSelectedHour] = useState(hours[0]);
    const [selectedMinute, setSelectedMinute] = useState(minutes[0]);

    // 드롭다운에서 선택된 값을 콜백 함수로 전달
    const handleSelectAmpm = (option) => {
        setSelectedAmpm(option);
        handleTime(option, selectedHour, selectedMinute);
    };

    const handleSelectHour = (option) => {
        setSelectedHour(option);
        handleTime(selectedAmpm, option, selectedMinute);
    };

    const handleSelectMinute = (option) => {
        setSelectedMinute(option);
        handleTime(selectedAmpm, selectedHour, option);
    };

    return (
        <St.StyledBox>
            <St.StyledFormBox $direction="row">
                <DropButton options={ampm} onSelect={handleSelectAmpm} />
                <DropButton options={hours} onSelect={handleSelectHour} />
                <DropButton options={minutes} onSelect={handleSelectMinute} />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalDropdown;

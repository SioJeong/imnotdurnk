import { useState } from 'react';
import DropButton from '../_button/DropButton';
import * as St from './Modal.style';

const ModalTimeDropdown = ({ selectedTime, handleSelectedTime }) => {
    const ampm = ['오전', '오후'];
    const hours = Array.from(
        { length: 12 },
        (_, i) => `${String(i + 1).padStart(2, '0')}시`,
    );
    const minutes = Array.from(
        { length: 60 },
        (_, i) => `${String(i).padStart(2, '0')}분`,
    );

    const [selectedAmpm, setSelectedAmpm] = useState(selectedTime.ampm);
    const [selectedHour, setSelectedHour] = useState(selectedTime.hour);
    const [selectedMinute, setSelectedMinute] = useState(selectedTime.minute);

    // 드롭다운에서 선택된 값을 콜백 함수로 전달
    const handleSelectAmpm = (option) => {
        setSelectedAmpm(option);
        handleSelectedTime(option, selectedHour, selectedMinute);
    };

    const handleSelectHour = (option) => {
        setSelectedHour(option);
        handleSelectedTime(selectedAmpm, option, selectedMinute);
    };

    const handleSelectMinute = (option) => {
        setSelectedMinute(option);
        handleSelectedTime(selectedAmpm, selectedHour, option);
    };

    return (
        <St.StyledBox>
            <St.StyledFormBox $direction="row">
                <DropButton
                    options={ampm}
                    onSelect={handleSelectAmpm}
                    originValue={selectedTime.ampm}
                />
                <DropButton
                    options={hours}
                    onSelect={handleSelectHour}
                    originValue={selectedTime.hour}
                />
                <DropButton
                    options={minutes}
                    onSelect={handleSelectMinute}
                    originValue={selectedTime.minute}
                />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalTimeDropdown;

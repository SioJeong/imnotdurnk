import { useState } from 'react';
import DropButton from '../../components/_button/DropButton';
import * as St from './Modal.style';

const ModalDropdown = ({ handleSelectedTime }) => {
    const ampm = ['오전', '오후'];
    const hours = Array.from(
        { length: 12 },
        (_, i) => `${String(i + 1).padStart(2, '0')}시`,
    );
    const minutes = Array.from(
        { length: 60 },
        (_, i) => `${String(i).padStart(2, '0')}분`,
    );

    const [selectedAmpm, setSelectedAmpm] = useState(ampm[0]);
    const [selectedHour, setSelectedHour] = useState(hours[0]);
    const [selectedMinute, setSelectedMinute] = useState(minutes[0]);

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
                    originValue="오후"
                />
                <DropButton
                    options={hours}
                    onSelect={handleSelectHour}
                    originValue="6시"
                />
                <DropButton
                    options={minutes}
                    onSelect={handleSelectMinute}
                    originValue="00분"
                />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalDropdown;

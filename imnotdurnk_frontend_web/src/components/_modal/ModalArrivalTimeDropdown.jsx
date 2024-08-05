import { useState } from 'react';
import DropButton from '../_button/DropButton';
import * as St from './Modal.style';

const ModalArivalTimeDropdown = ({
    selectedArrivalTime,
    handleSelectedArrivalTime,
}) => {
    const ampm = ['오전', '오후'];
    const hours = Array.from(
        { length: 12 },
        (_, i) => `${String(i + 1).padStart(2, '0')}시`,
    );
    const minutes = Array.from(
        { length: 60 },
        (_, i) => `${String(i).padStart(2, '0')}분`,
    );

    const [selectedAmpm, setSelectedAmpm] = useState(selectedArrivalTime.ampm);
    const [selectedHour, setSelectedHour] = useState(selectedArrivalTime.hour);
    const [selectedMinute, setSelectedMinute] = useState(
        selectedArrivalTime.minute,
    );

    // 드롭다운에서 선택된 값을 콜백 함수로 전달
    const handleSelectAmpm = (option) => {
        setSelectedAmpm(option);
        handleSelectedArrivalTime(option, selectedHour, selectedMinute);
    };

    const handleSelectHour = (option) => {
        setSelectedHour(option);
        handleSelectedArrivalTime(selectedAmpm, option, selectedMinute);
    };

    const handleSelectMinute = (option) => {
        setSelectedMinute(option);
        handleSelectedArrivalTime(selectedAmpm, selectedHour, option);
    };

    return (
        <St.StyledBox>
            <St.StyledFormBox $direction="row">
                <DropButton
                    options={ampm}
                    onSelect={handleSelectAmpm}
                    originValue={selectedArrivalTime.ampm}
                />
                <DropButton
                    options={hours}
                    onSelect={handleSelectHour}
                    originValue={selectedArrivalTime.hour}
                />
                <DropButton
                    options={minutes}
                    onSelect={handleSelectMinute}
                    originValue={selectedArrivalTime.minute}
                />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalArivalTimeDropdown;

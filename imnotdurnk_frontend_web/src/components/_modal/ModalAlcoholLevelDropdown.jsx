import { useEffect, useState } from 'react';
import DropButton from '../_button/DropButton';
import * as St from './Modal.style';

const ModalAlcoholLevelDropdown = ({
    selectedAlcoholLevel,
    handleSelectedAlcoholLevel,
}) => {
    const alcoholLevel = [
        '0: 취하지 않음',
        '1: 살짝 취함',
        '2: 기분 좋게 취함',
        '3: 만취',
    ];

    const [currentAlcoholLevel, setCurrentAlcoholLevel] =
        useState(selectedAlcoholLevel);

    // 드롭다운에서 선택된 값을 콜백 함수로 전달
    const handleSelectAlcoholLevel = (option) => {
        setCurrentAlcoholLevel(option);
        handleSelectedAlcoholLevel(option);
    };

    useEffect(() => {
        setCurrentAlcoholLevel(selectedAlcoholLevel);
    }, [selectedAlcoholLevel]);

    return (
        <St.StyledBox>
            <St.StyledFormBox>
                <DropButton
                    options={alcoholLevel}
                    onSelect={handleSelectAlcoholLevel}
                    originValue={currentAlcoholLevel}
                    size="long"
                />
            </St.StyledFormBox>
        </St.StyledBox>
    );
};

export default ModalAlcoholLevelDropdown;

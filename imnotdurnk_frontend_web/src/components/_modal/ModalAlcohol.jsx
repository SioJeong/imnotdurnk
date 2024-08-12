import { useEffect, useState } from 'react';

import { icons } from '../../shared/constants/icons';
import StepperButton from '../_button/StepperButton';
import Checkbox from '../_common/Checkbox';
import * as St from './Modal.style';

const ModalAlcohol = ({
    drinkType,
    selectedSojuBottleCount,
    handleSelectedSojuBottleCount,
    selectedSojuGlassCount,
    handleSelectedSojuGlassCount,
    selectedBeerBottleCount,
    handleSelectedBeerBottleCount,
    selectedBeerGlassCount,
    handleSelectedBeerGlassCount,
    isForProfileCreatePage,
}) => {
    const [bottleCount, setBottleCount] = useState(0);
    const [glassCount, setGlassCount] = useState(0);
    const [capacity, setCapacity] = useState('모름');
    const [isUnknown, setIsUnknown] = useState(false); // "모르겠어요" 체크박스 상태

    const drink = drinkType === '소주' ? 'soju' : 'beer';

    useEffect(() => {
        if (drinkType === '소주') {
            setBottleCount(selectedSojuBottleCount);
            setGlassCount(selectedSojuGlassCount);
        } else {
            setBottleCount(selectedBeerBottleCount);
            setGlassCount(selectedBeerGlassCount);
        }
    }, []);

    useEffect(() => {
        if (isUnknown) {
            setCapacity('모름');
        } else {
            setCapacity(`${bottleCount}병 ${glassCount}잔`);
        }
    }, [bottleCount, glassCount, isUnknown]);

    useEffect(() => {
        if (drinkType === '소주') {
            handleSelectedSojuBottleCount(bottleCount);
            handleSelectedSojuGlassCount(glassCount);
        } else {
            handleSelectedBeerBottleCount(bottleCount);
            handleSelectedBeerGlassCount(glassCount);
        }
    }, [
        bottleCount,
        glassCount,
        drinkType,
        handleSelectedSojuBottleCount,
        handleSelectedSojuGlassCount,
        handleSelectedBeerBottleCount,
        handleSelectedBeerGlassCount,
    ]);

    // 주량 변경 함수
    const handleBottleIncrement = () => setBottleCount(bottleCount + 1);

    const handleBottleDecrement = () =>
        setBottleCount(Math.max(0, bottleCount - 1));

    const handleGlassIncrement = () => setGlassCount(glassCount + 1);

    const handleGlassDecrement = () =>
        setGlassCount(Math.max(0, glassCount - 1));

    // 체크 박스 boolean 변경 함수
    const handleCheckboxChange = () => {
        setIsUnknown(!isUnknown);
        // 주량 초기화
        setBottleCount(0);
        setGlassCount(0);
    };

    return (
        <St.StyledBox>
            <St.StyledStepperHeader>
                <h3>
                    {drinkType} {capacity}
                </h3>
                <Checkbox
                    text={'모르겠어요'}
                    checked={isUnknown}
                    onChange={handleCheckboxChange}
                />
            </St.StyledStepperHeader>
            <St.StyledStepperBody>
                <St.StyledStepperElement>
                    <St.StyledImageAndAmount>
                        <St.StyledStepperImage
                            src={icons[`${drink}Bottle`]}
                            alt={`${drink} bottle image`}
                        />
                        {drinkType === '맥주' ? <h5>500ml</h5> : <></>}
                        {drinkType === '소주' ? <h5>1병 = 8잔</h5> : <></>}
                    </St.StyledImageAndAmount>
                    <StepperButton
                        icon1={'minus'}
                        icon2={'plus'}
                        function1={handleBottleDecrement}
                        function2={handleBottleIncrement}
                    />
                </St.StyledStepperElement>
                <St.StyledStepperElement>
                    <St.StyledImageAndAmount>
                        <St.StyledStepperImage
                            src={icons[`${drink}Glass`]}
                            alt={`${drink} glass image`}
                        />
                        {drinkType === '맥주' ? <h5>355ml</h5> : <></>}
                        {drinkType === '소주' ? <h5>1잔 = 1/8병</h5> : <></>}
                    </St.StyledImageAndAmount>

                    <StepperButton
                        icon1={'minus'}
                        icon2={'plus'}
                        function1={handleGlassDecrement}
                        function2={handleGlassIncrement}
                    />
                </St.StyledStepperElement>
            </St.StyledStepperBody>
        </St.StyledBox>
    );
};

export default ModalAlcohol;

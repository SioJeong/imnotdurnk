import * as St from '@/components/mypage/ProfileCreateAlcoholCapacity.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperButton from '../_button/StepperButton';

import { icons } from '../../shared/constants/icons';
import Checkbox from '../_common/Checkbox';
const ModalEditDrinkingCapacity = ({
    selectedSojuBottleCount,
    setSelectedSojuBottleCount,
    selectedSojuGlassCount,
    setSelectedSojuGlassCount,
    selectedBeerBottleCount,
    setSelectedBeerBottleCount,
    selectedBeerGlassCount,
    setSelectedBeerGlassCount,
    toggleSojuUnsure,
    toggleBeerUnsure,
    sojuUnsure,
    beerUnsure,
}) => {
    const [sojuCapacity, setSojuCapacity] = useState(0);
    const [beerCapacity, setBeerCapacity] = useState(0);
    const navigate = useNavigate();
    const handleSojuBottle = (e, value) => {
        e.preventDefault();
        if (value === -1 && selectedSojuBottleCount <= 0) {
            setSelectedSojuBottleCount(0);
        } else {
            setSelectedSojuBottleCount(selectedSojuBottleCount + value);
        }
    };
    const handleSojuGlass = (e, value) => {
        e.preventDefault();
        if (value === -1 && selectedSojuGlassCount <= 0) {
            setSelectedSojuGlassCount(0);
        } else {
            setSelectedSojuGlassCount(selectedSojuGlassCount + value);
        }
    };
    const handleBeerBottle = (e, value) => {
        e.preventDefault();
        if (value === -1 && selectedBeerBottleCount <= 0) {
            setSelectedBeerBottleCount(0);
        } else {
            setSelectedBeerBottleCount(selectedBeerBottleCount + value);
        }
    };
    const handleBeerGlass = (e, value) => {
        e.preventDefault();
        if (value === -1 && selectedBeerGlassCount <= 0) {
            setSelectedBeerGlassCount(0);
        } else {
            setSelectedBeerGlassCount(selectedBeerGlassCount + value);
        }
    };
    const handleCheckboxChange = (name) => {
        if (name === 'beer') {
            toggleBeerUnsure();
        } else {
            toggleSojuUnsure();
        }
    };

    useEffect(() => {
        setSojuCapacity(selectedSojuBottleCount * 8 + selectedSojuGlassCount);
    }, [selectedSojuBottleCount, selectedSojuGlassCount]);

    useEffect(() => {
        setBeerCapacity(
            selectedBeerBottleCount * 500 + 355 * selectedBeerGlassCount,
        );
    }, [selectedBeerBottleCount, selectedBeerGlassCount]);

    return (
        <St.AlcoholCapacityContainer>
            <St.AlcoholCapacityBox>
                <St.AlcoholTitle>
                    <St.AlcoholText>
                        소주
                        {sojuUnsure
                            ? ' 모름'
                            : ` ${selectedSojuBottleCount}병 ${selectedSojuGlassCount}잔`}
                    </St.AlcoholText>

                    <Checkbox
                        text="모르겠어요"
                        checked={sojuUnsure}
                        onChange={() => handleCheckboxChange('soju')}
                    />
                </St.AlcoholTitle>
                <St.H6>1병 = 8잔</St.H6>
                <St.AlcoholInputContainer>
                    <St.AlcoholInputBox>
                        <St.AlcoholImage
                            src={icons['sojuBottle']}
                            alt={`soju bottle image`}
                        />
                        <StepperButton
                            icon1={'minus'}
                            icon2={'plus'}
                            function1={(e) => handleSojuBottle(e, -1)}
                            function2={(e) => handleSojuBottle(e, 1)}
                        />
                    </St.AlcoholInputBox>
                    <St.AlcoholInputBox>
                        <St.AlcoholImage
                            src={icons['sojuGlass']}
                            alt={`soju glass image`}
                        />
                        <StepperButton
                            icon1={'minus'}
                            icon2={'plus'}
                            function1={(e) => handleSojuGlass(e, -1)}
                            function2={(e) => handleSojuGlass(e, 1)}
                        />
                    </St.AlcoholInputBox>
                </St.AlcoholInputContainer>
            </St.AlcoholCapacityBox>
            <St.AlcoholCapacityBox>
                <St.AlcoholTitle>
                    <St.AlcoholText>
                        맥주{' '}
                        {beerUnsure
                            ? ' 모름'
                            : ` ${selectedBeerBottleCount}병 ${selectedBeerGlassCount}잔`}
                    </St.AlcoholText>

                    <Checkbox
                        text="모르겠어요"
                        checked={beerUnsure}
                        onChange={() => handleCheckboxChange('beer')}
                    />
                </St.AlcoholTitle>
                <St.H6> 1병 = 500mL,1잔 = 355mL</St.H6>
                <St.AlcoholInputContainer>
                    <St.AlcoholInputBox>
                        <St.AlcoholImage
                            src={icons['beerBottle']}
                            alt={`beer bottle image`}
                        />
                        <StepperButton
                            icon1={'minus'}
                            icon2={'plus'}
                            function1={(e) => handleBeerBottle(e, -1)}
                            function2={(e) => handleBeerBottle(e, 1)}
                        />
                    </St.AlcoholInputBox>
                    <St.AlcoholInputBox>
                        <St.AlcoholImage
                            src={icons['beerGlass']}
                            alt={`beer glass image`}
                        />
                        <StepperButton
                            icon1={'minus'}
                            icon2={'plus'}
                            function1={(e) => handleBeerGlass(e, -1)}
                            function2={(e) => handleBeerGlass(e, 1)}
                        />
                    </St.AlcoholInputBox>
                </St.AlcoholInputContainer>
            </St.AlcoholCapacityBox>
        </St.AlcoholCapacityContainer>
    );
};

export default ModalEditDrinkingCapacity;

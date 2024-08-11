import Button from '@/components/_button/Button';
import { useEffect, useState } from 'react';
import StepperButton from '../_button/StepperButton';
import Checkbox from '../_common/Checkbox';
import * as St from './ProfileCreateAlcoholCapacity.style';
const ProfileCreateAlcoholCapacity = () => {
    const [selectedSojuBottleCount, setSelectedSojuBottleCount] = useState(0);
    const [selectedSojuGlassCount, setSelectedSojuGlassCount] = useState(0);
    const [selectedBeerBottleCount, setSelectedBeerBottleCount] = useState(0);
    const [selectedBeerGlassCount, setSelectedBeerGlassCount] = useState(0);
    const [calculatedSoju, setCaculatedSoju] = useState(0);
    const [calculatedBeer, setCaculatedBeer] = useState(0);
    const handleSojuBottle = (e, value) => {
        e.preventDefault();
        if (value === -1 && selectedSojuBottleCount <= 0) {
            setSelectedSojuBottleCount(0);
        } else {
            setSelectedSojuBottleCount(selectedSojuBottleCount + value);
        }
        console.log(selectedSojuBottleCount);
        setCaculatedSoju(selectedSojuBottleCount + selectedSojuGlassCount / 8);
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

    useEffect(() => {
        setCaculatedSoju(
            Math.floor(
                (selectedSojuBottleCount + selectedSojuGlassCount / 8) * 10,
            ) / 10,
        );
    }, [selectedSojuBottleCount, selectedSojuGlassCount]);

    useEffect(() => {
        setCaculatedBeer(
            Math.floor(
                (selectedBeerBottleCount +
                    (selectedBeerGlassCount / 355) * 500) *
                    10,
            ) / 10,
        );
    }, [selectedBeerBottleCount, selectedBeerGlassCount]);

    return (
        <St.ProfileCreateContainer>
            <St.MessageWrapper>
                <St.Title>주량을 알려주세요</St.Title>
                <St.SubTitle>
                    알려주신 주량으로 음주 습관을 알려드릴게요.
                </St.SubTitle>
            </St.MessageWrapper>

            <St.AlcoholCapacityContainer>
                <St.AlcoholCapacityBox>
                    <St.AlcoholTitle>
                        <St.AlcoholText>소주 {calculatedSoju}병</St.AlcoholText>
                        <Checkbox
                            text={'모르겠어요'}
                            // checked={isUnknown}
                            // onChange={handleCheckboxChange}
                        />
                    </St.AlcoholTitle>
                    <St.AlcoholInputContainer>
                        <St.AlcoholInputBox>
                            <St.AlcoholImage
                                src={`/src/assets/images/sojubottle.webp`}
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
                                src={`/src/assets/images/sojuglass.webp`}
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
                        <St.AlcoholText>맥주 {calculatedBeer}병</St.AlcoholText>
                        <Checkbox
                            text={'모르겠어요'}
                            // checked={isUnknown}
                            // onChange={handleCheckboxChange}
                        />
                    </St.AlcoholTitle>
                    <St.AlcoholInputContainer>
                        <St.AlcoholInputBox>
                            <St.AlcoholImage
                                src={`/src/assets/images/beerbottle.webp`}
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
                                src={`/src/assets/images/beerglass.webp`}
                                alt={`beer glass image`}
                            />
                            <StepperButton
                                icon1={'minus'}
                                icon2={'plus'}
                                function1={(e) => handleBeerBottle(e, -1)}
                                function2={(e) => handleBeerBottle(e, 1)}
                            />
                        </St.AlcoholInputBox>
                    </St.AlcoholInputContainer>
                </St.AlcoholCapacityBox>
            </St.AlcoholCapacityContainer>
            <St.ButtonBox>
                <Button text="Skip" size="medium" isRed={false} />
                <Button text="Next" size="medium" isRed={true} />
            </St.ButtonBox>
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateAlcoholCapacity;

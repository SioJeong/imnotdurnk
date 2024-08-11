import Button from '@/components/_button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { putUserDetailedInfo } from '../../services/user';
import StepperButton from '../_button/StepperButton';
import { ToastSuccess } from '../_common/alert';
import Checkbox from '../_common/Checkbox';
import * as St from './ProfileCreateAlcoholCapacity.style';
const ProfileCreateAlcoholCapacity = () => {
    const [selectedSojuBottleCount, setSelectedSojuBottleCount] = useState(0);
    const [selectedSojuGlassCount, setSelectedSojuGlassCount] = useState(0);
    const [selectedBeerBottleCount, setSelectedBeerBottleCount] = useState(0);
    const [selectedBeerGlassCount, setSelectedBeerGlassCount] = useState(0);
    const [calculatedSoju, setCalculatedSoju] = useState(0); //병으로 계산된 소주량
    const [calculatedBeer, setCalculatedBeer] = useState(0); //병으로 계산된 맥주량
    const [beerUnsure, setBeerUnsure] = useState(false); //맥주량 모름
    const [sojuUnsure, setSojuUnsure] = useState(false); //소주량 모름
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
            setBeerUnsure(!beerUnsure);
            setSelectedBeerBottleCount(0);
            setSelectedBeerGlassCount(0);
        } else {
            setSojuUnsure(!sojuUnsure);
            setSelectedSojuBottleCount(0);
            setSelectedSojuGlassCount(0);
        }
    };
    const onClickSkipButton = () => {
        navigate('/');
    };
    const onClickNextButton = async (e) => {
        e.preventDefault();

        const profileUpdateAlcoholResult = await putUserDetailedInfo({
            sojuUnsure: sojuUnsure,
            beerUnsure: beerUnsure,
            sojuCapacity: sojuUnsure ? 0 : sojuCapacity,
            beerCapacity: beerUnsure ? 0 : beerCapacity,
        });
        if (profileUpdateAlcoholResult.isSuccess) {
            ToastSuccess('프로필을 저장했습니다', true);
            navigate('/');
        }
    };
    useEffect(() => {
        setCalculatedSoju(
            Math.floor(
                (selectedSojuBottleCount + selectedSojuGlassCount / 8) * 10,
            ) / 10,
        );
        setSojuCapacity(selectedSojuBottleCount * 8 + selectedSojuGlassCount);
    }, [selectedSojuBottleCount, selectedSojuGlassCount]);

    useEffect(() => {
        setCalculatedBeer(
            Math.floor(
                (selectedBeerBottleCount +
                    ((selectedBeerGlassCount / 355) * 500) / 2) *
                    10,
            ) / 10,
        );
        setBeerCapacity(
            selectedBeerBottleCount * 500 + 355 * selectedBeerGlassCount,
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
                        <St.AlcoholText>
                            소주{sojuUnsure ? ' 모름' : ` ${calculatedSoju}병`}
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
                        <St.AlcoholText>
                            맥주 {beerUnsure ? ' 모름' : ` ${calculatedBeer}병`}
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
                                function1={(e) => handleBeerGlass(e, -1)}
                                function2={(e) => handleBeerGlass(e, 1)}
                            />
                        </St.AlcoholInputBox>
                    </St.AlcoholInputContainer>
                </St.AlcoholCapacityBox>
            </St.AlcoholCapacityContainer>
            <St.ButtonBox>
                <Button
                    text="Skip"
                    size="medium"
                    isRed={false}
                    onClick={onClickSkipButton}
                />
                <Button
                    text="Next"
                    size="medium"
                    isRed={true}
                    onClick={(e) => onClickNextButton(e)}
                />
            </St.ButtonBox>
        </St.ProfileCreateContainer>
    );
};

export default ProfileCreateAlcoholCapacity;

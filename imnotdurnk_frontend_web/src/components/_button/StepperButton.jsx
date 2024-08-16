import { icons } from '../../shared/constants/icons.js';
import * as St from './StepperButton.style.js';

const StepperButton = ({ icon1, icon2, function1, function2 }) => {
    return (
        <St.StepperContainer>
            <St.StyledButton onClick={function1}>
                <St.StyledIcon src={icons[`${icon1}`]} alt={`${icon1} icon`} />
            </St.StyledButton>
            <St.StyledButton onClick={function2}>
                <St.StyledIcon src={icons[`${icon2}`]} alt={`${icon2} icon`} />
            </St.StyledButton>
        </St.StepperContainer>
    );
};

export default StepperButton;

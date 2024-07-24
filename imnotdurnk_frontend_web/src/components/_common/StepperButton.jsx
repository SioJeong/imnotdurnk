import * as St from './StepperButton.style.js';

const StepperButton = ({ icon1, icon2 }) => {
    return (
        <St.StepperContainer>
            <St.StyledButton>
                <St.StyledIcon
                    src={`src/assets/icons/Icon-${icon1}.svg`}
                    alt={`${icon1} icon`}
                />
            </St.StyledButton>
            <St.StyledButton>
                <St.StyledIcon
                    src={`src/assets/icons/Icon-${icon2}.svg`}
                    alt={`${icon2} icon`}
                />
            </St.StyledButton>
        </St.StepperContainer>
    );
};

export default StepperButton;

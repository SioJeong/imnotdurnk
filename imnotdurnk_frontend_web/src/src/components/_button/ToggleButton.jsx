import * as St from './ToggleButton.style';
const ToggleButton = ({
    toggle1,
    toggle2,
    isMono,
    isFirstSelected,
    changeFirstToggle,
    changeSecondToggle,
}) => {
    return (
        <St.ToggleButtonContainer $isMono={isMono}>
            <St.ToggleButton
                $isMono={isMono}
                $isSelected={isFirstSelected}
                onClick={changeFirstToggle}
            >
                <St.StyledH4 $isSelected={isFirstSelected}>
                    {toggle1}
                </St.StyledH4>
            </St.ToggleButton>
            <St.ToggleButton
                $isMono={isMono}
                $isSelected={!isFirstSelected}
                onClick={changeSecondToggle}
            >
                <St.StyledH4 $isSelected={!isFirstSelected}>
                    {toggle2}
                </St.StyledH4>
            </St.ToggleButton>
        </St.ToggleButtonContainer>
    );
};

export default ToggleButton;

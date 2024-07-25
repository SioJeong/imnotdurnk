import * as St from './ToggleButton.style';
const ToggleButton = ({
    toggle1,
    toggle2,
    isMono,
    isFirstSelected,
    changeToggle,
}) => {
    return (
        <St.ToggleButtonContainer $isMono={isMono}>
            <St.ToggleButton
                $isMono={isMono}
                $isSelected={isFirstSelected}
                onClick={changeToggle}
            >
                <St.StyledH4 $isSelected={isFirstSelected}>
                    {toggle1}
                </St.StyledH4>
            </St.ToggleButton>
            <St.ToggleButton
                $isMono={isMono}
                $isSelected={!isFirstSelected}
                onClick={changeToggle}
            >
                <St.StyledH4 $isSelected={!isFirstSelected}>
                    {toggle2}
                </St.StyledH4>
            </St.ToggleButton>
        </St.ToggleButtonContainer>
    );
};

export default ToggleButton;

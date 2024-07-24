import * as St from './ToggleButton.style';
import { useState } from 'react';
const ToggleButton = ({toggle1, toggle2, isMono}) => {
    const [isFirstSelected, setIsFirstSelected] = useState(true);

    const changeToggle= () =>{
        setIsFirstSelected(!isFirstSelected);
    }
    return (
        <St.ToggleButtonContainer $isMono={isMono} >
           <St.ToggleButton $isMono={isMono} $isSelected={isFirstSelected} onClick={changeToggle}>
                <St.StyledH4 $isSelected={isFirstSelected}>
                    {toggle1}
                </St.StyledH4>
           </St.ToggleButton>
           <St.ToggleButton $isMono={isMono} $isSelected={!isFirstSelected} onClick={changeToggle}>
                <St.StyledH4 $isSelected={!isFirstSelected}>
                    {toggle2}
                </St.StyledH4>
           </St.ToggleButton>
        </St.ToggleButtonContainer>
    );
};

export default ToggleButton;

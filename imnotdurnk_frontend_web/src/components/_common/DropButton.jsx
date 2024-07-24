import IconDown from '@/assets/icons/size_24/Icon-down.svg';
import React, { useState } from 'react';
import * as St from './DropButton.style';

const DropButton = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleDropdownList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <St.DropButton>
            <St.DropdownHeader onClick={handleDropdownList}>
                {selectedOption}
                <img src={IconDown} alt="Dropdown icon" />
            </St.DropdownHeader>
            {isOpen && (
                <St.DropdownList>
                    {options.map((option, index) => (
                        <St.DropdownItem
                            key={index}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </St.DropdownItem>
                    ))}
                </St.DropdownList>
            )}
        </St.DropButton>
    );
};

export default DropButton;

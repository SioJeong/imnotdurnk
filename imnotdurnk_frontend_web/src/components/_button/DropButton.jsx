import IconDown from '@/assets/icons/size_24/Icon-down.svg';
import { useEffect, useRef, useState } from 'react';
import * as St from './DropButton.style';

const DropButton = ({ options, onSelect, originValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(originValue);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    const handleDropdownList = () => {
        setIsOpen(!isOpen);
    };

    // 드롭다운 외부 클릭 시 모달 닫기
    useEffect(() => {
        const closeDropDown = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        // 이벤트 리스너 등록 및 해제
        document.addEventListener('mousedown', closeDropDown);
        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, [dropdownRef]);

    return (
        <St.DropButton ref={dropdownRef}>
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
                            $isFirst={index === 0}
                            $isLast={index === options.length - 1}
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

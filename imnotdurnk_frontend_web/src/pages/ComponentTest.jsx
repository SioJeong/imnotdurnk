import DropButton from '@/components/_button/DropButton';
import MiniButton from '@/components/_button/MiniButton';
import StepperButton from '@/components/_button/StepperButton';
import ToggleButton from '@/components/_button/ToggleButton';
import InputBox from '@/components/_common/InputBox';
import Pagenation from '@/components/_common/Pagination';
import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect } from 'react';

const ComponentTest = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: 'Test용 화면입니다. home은 /home 경로',
            icon2: { iconname: 'check', isRed: true },
        });
    }, [setNavigation]);

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <>
            <hr />
            <br />
            <Pagenation totalPages="4" />
            <br />
            <hr />
            <br />
            <ToggleButton toggle1="토글1" toggle2="토글2" isMono={false} />
            <ToggleButton toggle1="토글1" toggle2="토글2" isMono={true} />
            <br />
            <hr />
            <DropButton options={options} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <InputBox
                labelText="Username"
                iconName="address"
                inputType="text"
                size=""
            />
            <InputBox
                labelText="label1"
                iconName="email"
                inputType="text"
                size="small"
            />
            <hr />
            <br />
            <MiniButton text="비밀번호 변경" iconname="key" isRed={true} />
            <br />
            <hr />
            <br />
            <StepperButton icon1="minus" icon2="plus" />
        </>
    );
};

export default ComponentTest;

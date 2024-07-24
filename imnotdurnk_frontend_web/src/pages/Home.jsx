import ToggleButton from '@/components/_common/ToggleButton';
import useNavigationStore from '@/stores/useNavigationStore';
<<<<<<< HEAD
<<<<<<< HEAD
import Pagenation from '@/components/_common/Pagination';
=======
=======
>>>>>>> ccf40d5bd3cef320ef6fe5be3ca036239448e95d
import { useEffect } from 'react';
import DropButton from '../components/_common/DropButton';
import InputBox from '../components/_common/InputBox';
import MiniButton from '../components/_common/MiniButton';
import StepperButton from '../components/_common/StepperButton';
<<<<<<< HEAD
>>>>>>> 97f7f321004678f63964bb9c108dcb116981100e
=======
>>>>>>> ccf40d5bd3cef320ef6fe5be3ca036239448e95d

const Home = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address' },
            title: 'Home',
            icon2: { iconname: 'check', isRed: true },
        });
    }, [setNavigation]);

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <>
<<<<<<< HEAD
<<<<<<< HEAD
           <Pagenation totalPages ='4' />
=======
=======
>>>>>>> ccf40d5bd3cef320ef6fe5be3ca036239448e95d
            <ToggleButton toggle1="토글1" toggle2="토글2" isMono={true} />
            <DropButton options={options} />
            <InputBox
                labelText="Username"
                iconName="address"
                inputType="text"
                size=""
            />
            <MiniButton text="비밀번호 변경" iconname="key" isRed={true} />
            <StepperButton icon1="plus" icon2="minus" />
<<<<<<< HEAD
>>>>>>> 97f7f321004678f63964bb9c108dcb116981100e
=======
>>>>>>> ccf40d5bd3cef320ef6fe5be3ca036239448e95d
        </>
    );
};

export default Home;

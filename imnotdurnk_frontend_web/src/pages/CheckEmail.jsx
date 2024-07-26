import { styled } from 'styled-components';
import { useEffect } from 'react';
import useNavigationStore from '@/stores/useNavigationStore';
import Button from '@/components/_button/Button.jsx';
import InputBox from '@/components/_common/InputBox.jsx';
const CheckEmail = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow' },
            title: '비밀번호 찾기',
            icon2: { iconname: 'empty' },
        });
    }, [setNavigation]);

    return (
        <CheckEmailContainer>
            <StyledH2>이메일을 입력해주세요.</StyledH2>
            <InputBox
                labelText="Your Email"
                iconName="email"
                inputType="email"
                size=""
            />
            <Button text="새 비밀번호 보내기" size="big" isRed="true" />
        </CheckEmailContainer>
    );
};
const CheckEmailContainer = styled.div`
    display: flex;
    padding: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    border-radius: 20px;
    background: var(----color-green2, #465a54);
`;

const StyledH2 = styled.h2`
    color: var(----color-white1, #fff);
    line-height: normal;
`;

export default CheckEmail;

import { styled } from 'styled-components';
import { useEffect } from 'react';
import useNavigationStore from '@/stores/useNavigationStore';
const FindPassword = () => {
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
            <StyledH2>이메일을 인증하세요.</StyledH2>
            <StyledH3>
                입력하신 imnotdurnk@gmail.com로 인증코드를 보냈습니다.
            </StyledH3>
            <StyledH3>
                아래에 인증코드를 입력하시고 회원가입을 마치세요.
            </StyledH3>
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
    background-color: var(----color-green2, #465a54);
`;

const StyledH2 = styled.h2`
    color: var(--color-white1, #ffffff);
    line-height: normal;
`;

const StyledH3 = styled.h3``;

export default FindPassword;

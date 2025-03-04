import { styled } from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    width: 23.5rem;
    padding: 0rem 2.3571rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.3571rem;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.7143rem;
    align-self: stretch;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.3571rem;
    align-self: stretch;
`;

const SubTitle = styled.h3`
    color: var(--color-green3, #252f2c);
    line-height: normal;
`;

const MainTitle = styled.h1`
    color: var(--color-green3, #252f2c);
    line-height: normal;
`;

const InputBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.6429rem;
    align-self: stretch;
`;

const LoginSubQuestionContainer = styled.div`
    display: flex;
    width: 18.7857rem;
    height: 1.1429rem;
    justify-content: space-between;
    align-items: center;
`;

const ForgetPasswordMessage = styled.h6`
    color: var(--color-green3, #252f2c);
    text-align: right;
    font-size: var(--font-body-h6, 0.57rem);
    line-height: normal;
    cursor: pointer;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7143rem;

    width: 100%;
`;

export {
    ButtonBox,
    ForgetPasswordMessage,
    FormContainer,
    InputBoxWrapper,
    LoginContainer,
    LoginSubQuestionContainer,
    MainTitle,
    SubTitle,
    TitleContainer,
};

import { styled } from 'styled-components';

export const ProfileCreateContainer = styled.form`
    display: flex;
    padding: 1rem 1rem 2rem 1rem;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
`;

export const InfoContainer = styled.div`
    display: flex;
    padding: 1.7143rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.7143rem;
    align-self: stretch;
    border-radius: 20px;
    background: var(--color-green2, #465a54);
`;

export const Title = styled.h2`
    color: var(--color-white1, #fff);
`;
export const SubTitle = styled.p`
    color: var(--color-white1, #fff);
    font-size: var(--font-body-h3, 1rem);
`;

export const RecordContainer = styled.div`
    display: flex;
    padding: 46px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
`;
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.1429rem;
    align-self: stretch;
`;
export const RecordButton = styled.img`
    display: flex;
    width: 11rem;
    height: 11rem;
    padding: 0.9166rem;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
`;

export const RecordMessage = styled.p`
    align-self: stretch;
    text-align: center;
    font-size: var(--font-body-h3, 1rem);
`;
export const ButtonBox = styled.div`
    display: flex;
    width: 20.2857rem;
    padding: 0rem 1.7143rem;
    justify-content: space-between;
    align-items: center;
`;

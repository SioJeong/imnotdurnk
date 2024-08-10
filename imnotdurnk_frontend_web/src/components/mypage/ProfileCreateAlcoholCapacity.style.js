import { styled } from 'styled-components';

export const ProfileCreateContainer = styled.form`
    display: flex;
    padding: 2.0714rem 1.7143rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
    gap: 20px;
`;
export const Title = styled.h2``;
export const SubTitle = styled.p`
    font-size: var(--font-body-h3, 1rem);
`;

export const MessageWrapper = styled.div`
    align-self: stretch;
    color: var(--color-green3, #252f2c);
    gap: 0.7143rem;
    font-size: var(--font-body-h2);
`;
export const AlcoholCapacityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.7143rem;
    align-self: stretch;
`;
export const AlcoholCapacityBox = styled.div`
    display: flex;
    width: 20.2857rem;
    padding: 1.7143rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: var(--color-yellow, #f3f0a8);
    gap: 0.5571rem;
`;

export const AlcoholTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;
export const AlcoholText = styled.h3``;
export const AlcoholInputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    align-self: stretch;
`;
export const AlcoholInputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const AlcoholImage = styled.img`
    display: flex;
    height: 7.1429rem;
    justify-content: center;
    align-items: flex-end;
    object-fit: cover;
`;

export const ButtonBox = styled.div`
    display: flex;
    padding: 1.7143rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

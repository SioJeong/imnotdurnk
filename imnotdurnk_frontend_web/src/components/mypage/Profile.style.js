import { styled } from 'styled-components';
export const ProfileContainer = styled.div`
    display: flex;
    width: 23.7143rem;
    padding: 1.8571rem 1.7143rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4286rem;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
`;
export const Title = styled.h2`
    display: flex;
    width: 100%;
    height: 2.2857rem;
    align-items: center;
    align-self: stretch;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7143rem;
    align-self: stretch;
`;
export const AlcoholCapacityBox = styled.div`
    display: flex;
    height: 5.7143rem;
    padding: 0rem 1.7143rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 10px;
    background: var(--color-green2, #465a54);
`;
export const VoiceBox = styled.div`
    display: flex;
    height: 2.8571rem;
    padding: 0.3571rem 1.7143rem;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    gap: 5.9286rem;
    background: var(--color-green2, #465a54);
`;
export const StyledH6 = styled.h6`
    color: var(--color-white1, #fff);
`;
export const ButtonContainer = styled.div`
    display: flex;
    height: 1.7143rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;
export const VoiceButton = styled.img`
    display: flex;
    width: 1.7143rem;
    height: 1.7143rem;
    padding: 0.1429rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

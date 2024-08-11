import RecordButton from '@/assets/icons/size_24/Icon-voice.svg';
import { styled } from 'styled-components';

export const VoiceButton = styled.img.attrs({
    src: RecordButton,
    alt: 'Record Button',
})`
    display: flex;
    width: 1.7143rem;
    height: 1.7143rem;
    padding: 0.1429rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    filter: brightness(0) invert(1); /* 흰색으로 보이도록 조정 */
`;

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
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    height: 5.7143rem;
    padding: 0rem 1.7143rem;

    align-self: stretch;
    border-radius: 10px;
    background: var(--color-green2, #465a54);
`;
export const AlcolBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.0714rem;
`;
export const StyledStepperImage = styled.img`
    height: 2.4286rem;
    flex-shrink: 0;
`;
export const Text = styled.h5``;

export const SojuBox = styled.div`
    display: flex;
    width: 5.7143rem;
    padding: 0.2857rem 0rem;
    justify-content: center;
    align-items: center;
    gap: 0.7143rem;
    border-radius: 10px;
    background: var(--color-white1, #fff);
`;
export const BeerBox = styled.div`
    display: flex;
    width: 5.7143rem;
    padding: 0.2857rem 0rem;
    justify-content: center;
    align-items: center;
    gap: 0.7143rem;
    border-radius: 10px;
    background: var(--color-white1, #fff);
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

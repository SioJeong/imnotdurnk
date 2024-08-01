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

export const MessageWrapper = styled.div`
    align-self: stretch;
    color: var(--color-green3, #252f2c);

    font-size: var(--font-body-h2);
`;
export const InputContainer = styled.div`
    display: flex;
    height: 19.8571rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;
export const ButtonBox = styled.div`
    display: flex;
    padding: 1.7143rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

export const PostalCodeSearchBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-self: stretch;
`;

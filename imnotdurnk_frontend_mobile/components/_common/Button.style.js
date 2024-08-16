import { Pressable } from 'react-native';
import { styled } from 'styled-components';

const StyledButton = styled(Pressable)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 42px;
    padding: 10px 0;

    border: none;
    border-radius: 45px;

    background-color: ${(props) =>
        props.$isEmpty
            ? props.theme.colors.white1
            : props.$isRed
              ? props.theme.colors.red
              : props.theme.colors.white2};
`;

export { StyledButton };

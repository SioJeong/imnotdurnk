import { css, keyframes, styled } from 'styled-components';

const moveUpDown1 = keyframes`
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-5px); }
    75% { transform: translateY(5px); }
`;

const moveUpDown2 = keyframes`
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(5px); }
    75% { transform: translateY(-5px); }
`;

const SVGContainer = styled.div`
    width: 140px;
    height: 140px;

    .line1 {
        ${({ $isRecording }) =>
            $isRecording &&
            css`
                animation: ${moveUpDown1} 0.8s infinite ease-in-out;
            `}
    }

    .line2 {
        ${({ $isRecording }) =>
            $isRecording &&
            css`
                animation: ${moveUpDown2} 0.8s infinite ease-in-out;
                animation-delay: 0.1s;
            `}
    }

    .line3 {
        ${({ $isRecording }) =>
            $isRecording &&
            css`
                animation: ${moveUpDown1} 0.8s infinite ease-in-out;
                animation-delay: 0.2s;
            `}
    }

    .line4 {
        ${({ $isRecording }) =>
            $isRecording &&
            css`
                animation: ${moveUpDown2} 0.8s infinite ease-in-out;
                animation-delay: 0.3s;
            `}
    }

    .line5 {
        ${({ $isRecording }) =>
            $isRecording &&
            css`
                animation: ${moveUpDown1} 0.8s infinite ease-in-out;
                animation-delay: 0.4s;
            `}
    }
`;

export { SVGContainer };

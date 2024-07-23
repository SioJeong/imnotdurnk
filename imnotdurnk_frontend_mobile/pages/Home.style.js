import styled from 'styled-components/native';
import GlobalText from '../shared/styles/GlobalText';

const TitleText = styled(GlobalText)`
    font-size: ${({ theme }) => theme.fontSize.titleH2}px;
    color: ${({ theme }) => theme.colors.green3};
`;

const BodyText = styled(GlobalText)`
    font-size: ${({ theme }) => theme.fontSize.bodyH4}px;
    color: ${({ theme }) => theme.colors.red};
`;

export { BodyText, TitleText };

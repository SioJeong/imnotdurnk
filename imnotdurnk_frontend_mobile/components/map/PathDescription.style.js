import { View } from 'react-native';
import { styled } from 'styled-components/native';

const DescriptionContainer = styled(View)`
    flex-direction: column;
    justify-content: center;

    width: 100%;
    padding: 14px 24px;
    gap: 16px;

    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.white2};
`;

const InfoView = styled(View)`
    flex-direction: column;
    justify-content: center;

    width: 100%;
`;

const InfoHeaderView = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`;

const InfoTitleView = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;

const InfoDurationView = styled(View)`
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

export {
    DescriptionContainer,
    InfoDurationView,
    InfoHeaderView,
    InfoTitleView,
    InfoView,
};

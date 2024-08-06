import MapView from 'react-native-maps';
import { styled } from 'styled-components/native';

const MapContainer = styled.View`
    flex: 1;
    border-radius: 20px;
    overflow: hidden;

    min-height: 300px;
`;

const StyledMap = styled(MapView)`
    flex: 1;
    width: 100%;
`;

export { MapContainer, StyledMap };

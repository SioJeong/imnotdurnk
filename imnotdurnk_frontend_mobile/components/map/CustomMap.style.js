import { styled } from 'styled-components/native';
import MapView from 'react-native-maps';

const MapContainer = styled.View`
    flex: 1;
    border-radius: 20px;
    overflow: hidden;
`;

const StyledMap = styled(MapView)`
    flex: 1;
    width: 100%;
`;

export { MapContainer, StyledMap };

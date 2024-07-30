import { PROVIDER_GOOGLE } from 'react-native-maps';
import { MapContainer, StyledMap } from './CustomMap.style';

const CustomMap = ({ region }) => {
    return (
        <MapContainer>
            {region && <StyledMap provider={PROVIDER_GOOGLE} region={region} />}
        </MapContainer>
    );
};

export default CustomMap;

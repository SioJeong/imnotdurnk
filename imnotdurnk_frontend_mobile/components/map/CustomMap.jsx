import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MapContainer, StyledMap } from './CustomMap.style';

const CustomMap = ({ region, departure, destination }) => {
    return (
        <MapContainer>
            {region && (
                <StyledMap provider={PROVIDER_GOOGLE} region={region}>
                    {departure && (
                        <Marker
                            coordinate={departure}
                            title="출발지"
                            description="현재 위치"
                        />
                    )}
                    {destination && (
                        <Marker
                            coordinate={destination}
                            title="목적지"
                            description="선택한 목적지"
                        />
                    )}
                </StyledMap>
            )}
        </MapContainer>
    );
};

export default CustomMap;

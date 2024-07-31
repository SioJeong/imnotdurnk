// services/geocodingService.js
import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';

const getReverseGeocoding = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}&language=ko`,
        );
        return (
            response.data.results[0]?.formatted_address ||
            '현재 위치를 알 수 없음'
        );
    } catch (error) {
        console.error('주소 요청 중 오류 발생', error);
        throw error;
    }
};

export { getReverseGeocoding };

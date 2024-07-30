import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SearchBarContainer } from './SearchBar.style';
import { useTheme } from 'styled-components/native';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDushsIyoXh3N-MV2gDlhFlvPWYYbASgjg';

const SearchBar = ({ setRegion, setCurrentAddress }) => {
    const theme = useTheme();

    return (
        <SearchBarContainer>
            <GooglePlacesAutocomplete
                placeholder="목적지를 입력하세요"
                onPress={(data, details = null) => {
                    if (details) {
                        const { lat, lng } = details.geometry.location;
                        setRegion({
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 0.0008,
                            longitudeDelta: 0.0008,
                        });
                        setCurrentAddress(details.formatted_address);
                    }
                }}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'ko',
                    components: 'country:kr',
                }}
                fetchDetails={true}
                enablePoweredByContainer={false}
                styles={{
                    textInputContainer: {},
                    // 검색 창 인풋 스타일
                    textInput: {
                        backgroundColor: 'transparent',
                        height: 25,
                        fontSize: theme.fontSize.H4,
                        color: theme.colors.green3,
                        numberOfLines: 1,
                        ellipsizeMode: 'tail',
                    },
                    // 검색 결과 전체 스타일
                    listView: {
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: 40,
                        width: '100%',
                        zIndex: 1,
                    },
                    // 검색 결과 항목 리스트 스타일
                    row: {
                        height: 35,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        backgroundColor: theme.colors.green2,
                    },
                    // 검색 결과 항목 각각 스타일
                    description: {
                        fontSize: theme.fontSize.H5,
                        color: theme.colors.white1,
                        flexShrink: 1,
                    },
                }}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;

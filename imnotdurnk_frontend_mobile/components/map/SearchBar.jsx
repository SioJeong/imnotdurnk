import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useTheme } from 'styled-components/native';
import { SearchBarContainer } from './SearchBar.style';

const SearchBar = ({ placeholder, onPress }) => {
    const theme = useTheme();

    const autoCompleteStyles = {
        textInputContainer: {},
        textInput: {
            backgroundColor: 'transparent',
            height: 25,
            fontFamily: 'Pretendard-Medium',
            fontSize: theme.fontSize.H4,
            color: theme.colors.green3,
        },
        listView: {
            position: 'absolute',
            top: 40,
            width: '100%',
            // To-do 검색 결과가 지도 아래로 숨겨짐. 해결해야함
            zIndex: 9999,
            elevation: 9999,
        },
        row: {
            height: 35,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.white2,
        },
        description: {
            fontSize: theme.fontSize.H5,
            color: theme.colors.green3,
            flexShrink: 1,
        },
    };

    return (
        <SearchBarContainer>
            <GooglePlacesAutocomplete
                placeholder={placeholder}
                onPress={(data, details = null) => {
                    if (details) {
                        const { lat, lng } = details.geometry.location;
                        onPress({
                            latitude: lat,
                            longitude: lng,
                        });
                    }
                }}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'ko',
                    components: 'country:kr',
                }}
                fetchDetails={true}
                enablePoweredByContainer={false}
                textInputProps={{
                    placeholderTextColor: theme.colors.green3,
                }}
                styles={autoCompleteStyles}
                listViewDisplayed="auto"
                keyboardShouldPersistTaps="always"
                returnKeyType="search"
            />
        </SearchBarContainer>
    );
};

export default SearchBar;

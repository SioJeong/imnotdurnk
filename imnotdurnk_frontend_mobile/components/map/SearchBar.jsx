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
            fontSize: theme.fontSize.H4,
            color: theme.colors.green3,
            numberOfLines: 1,
            ellipsizeMode: 'tail',
        },
        listView: {
            backgroundColor: 'white',
            position: 'absolute',
            top: 40,
            width: '100%',
            zIndex: 1,
        },
        row: {
            height: 35,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.green2,
        },
        description: {
            fontSize: theme.fontSize.H5,
            color: theme.colors.white1,
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
                styles={autoCompleteStyles}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;

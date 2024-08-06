import { useRef } from 'react';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useTheme } from 'styled-components/native';
import { SearchBarContainer } from './SearchBar.style';

const SearchBar = ({ placeholder, onPress }) => {
    const theme = useTheme();
    const searchBarRef = useRef(null);

    const autoCompleteStyles = {
        textInputContainer: {
            zIndex: 2,
        },
        textInput: {
            backgroundColor: 'transparent',
            height: 25,
            fontFamily: 'Pretendard-Medium',
            fontSize: theme.fontSize.H4,
            color: theme.colors.green3,
        },
        listView: {
            borderRadius: 10,
            position: 'absolute',
            top: 40,
            width: '100%',
            zIndex: 3,
            elevation: 3,
        },
        row: {
            height: 35,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.white2,
        },
        description: {
            fontFamily: 'Pretendard-Medium',
            fontSize: theme.fontSize.H5,
            color: theme.colors.green3,
            flexShrink: 1,
        },
    };

    const renderDescription = (description) => {
        // "대한민국" 제거
        const modifiedDescription = description.replace(/^대한민국\s/, '');
        return modifiedDescription;
    };

    return (
        <SearchBarContainer>
            <GooglePlacesAutocomplete
                ref={searchBarRef}
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
                    onFocus: () => {
                        if (searchBarRef.current) {
                            searchBarRef.current.setAddressText('');
                        }
                    },
                }}
                styles={autoCompleteStyles}
                listViewDisplayed="auto"
                keyboardShouldPersistTaps="always"
                returnKeyType="search"
                renderDescription={(row) => renderDescription(row.description)}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;

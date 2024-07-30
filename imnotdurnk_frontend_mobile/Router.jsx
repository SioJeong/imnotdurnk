import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Map from './pages/Map';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Map"
                component={Map}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default Router;

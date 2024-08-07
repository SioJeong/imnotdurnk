import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Map from './pages/Map';
import PathDetail from './pages/PathDetail';
import PathFinder from './pages/PathFinder';

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
            <Stack.Screen
                name="PathFinder"
                component={PathFinder}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PathDetail"
                component={PathDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default Router;

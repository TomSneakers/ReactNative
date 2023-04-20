import { Button } from "react-native";
import ProfilePage from "../component/Profile";
import CameraScreen from "./CameraScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./HomeScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();


export default function ProfileScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Page profil" component={ProfilePage} />
            <Tab.Screen
        name="Accueil"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Envoyer une photo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
      />
        </Tab.Navigator>
    );
}
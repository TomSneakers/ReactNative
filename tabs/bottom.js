import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../View/HomeScreen';
import Utilisation from '../View/QRScreen';
import Profil from '../View/CameraScreen';
import WriteToFile from '../View/CameraScreen';
import Camera from '../View/CameraScreen';
import Camera1 from '../View/CameraScreen';
import CameraScreen from '../View/CameraScreen';
import CodeQR from '../View/QRScreen';
import QRScreen from '../View/QRScreen';
import ScanScreen from '../View/ScanScreen';
import ProfilePage from '../View/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="À propos"
        component={QRScreen}
        options={{
          tabBarLabel: 'À propos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="data-matrix" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="data-matrix" color={color} size={size} />
          ),
        }}
      />


    </Tab.Navigator>
  );
}
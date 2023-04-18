import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../View/Home';
import Utilisation from '../View/Regle-d\'utilisation';
import Notifications from '../View/Notifiaction';

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
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Home}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="À propos"
        component={Utilisation}
        options={{
          tabBarLabel: 'À propos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="about" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
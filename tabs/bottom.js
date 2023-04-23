import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../View/HomeScreen';
import QRScreen from '../View/QRScreen';
import ScanScreen from '../View/ScanScreen';
import ProfileScreen from '../View/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
return (
// Crée un navigateur à onglets avec les onglets suivants
<Tab.Navigator
initialRouteName="Feed" // Définit l'onglet initial
screenOptions={{
tabBarActiveTintColor: '#e91e63', // Définit la couleur de l'onglet actif
}}
>
{/* Onglet Accueil */}
<Tab.Screen
name="Accueil" // Nom de l'onglet
component={Home} // Composant à afficher lorsqu'on clique sur l'onglet
options={{
tabBarLabel: 'Accueil', // Texte à afficher sous l'onglet
tabBarIcon: ({ color, size }) => (
// Icône à afficher à côté du texte de l'onglet
<MaterialCommunityIcons name="home" color={color} size={size} />
),
}}
/>
  {/* Onglet QR */}
  <Tab.Screen
    name="QR"
    component={QRScreen}
    options={{
      tabBarLabel: 'QR',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="data-matrix" color={color} size={size} />
      ),
    }}
  />

  {/* Onglet Scan */}
  <Tab.Screen
    name="Scan"
    component={ScanScreen}
    options={{
      tabBarLabel: 'Scan',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="line-scan" color={color} size={size} />
      ),
    }}
  />

  {/* Onglet Profil */}
  <Tab.Screen
    name="Profil"
    component={ProfileScreen}
    options={{
      tabBarLabel: 'Profil',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="account" color={color} size={size} />
      ),
    }}
  />
</Tab.Navigator>
);
}
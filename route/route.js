import { NavigationContainer, Stac } from "@react-navigation/native" // importation des modules nécessaires
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // importation des modules nécessaires
import MyTabs from "../tabs/bottom"; // importation d'un composant

const Stack = createNativeStackNavigator(); // création d'un objet Stack de type createNativeStackNavigator()

export default function Route() {

  return (
    // composant de navigation principal
    <NavigationContainer>
      {/* // objet de navigation Stack */}
      <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
        {/* // ajout d'un écran à la navigation */}
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

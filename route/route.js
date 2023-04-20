import { NavigationContainer, Stac } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from "../tabs/bottom";
import CameraScreen from "../View/CameraScreen";
const Stack = createNativeStackNavigator();

export default function Route() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
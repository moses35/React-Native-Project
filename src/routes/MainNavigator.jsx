import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../../src/screens/RegistrationScreen";
import { LoginScreen } from "../../src/screens/LoginScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";

export const MainNavigator = () => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <MainStack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./navigation/TabNavigator";
import LoginPage from "./screens/LoginPage"; // Correct path if necessary
import SignUpPage from "./screens/SignUpPage"; // Correct path if necessary

import { UserProvider } from "./context/UserContext"; // Adjust the path as needed

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            {/* Main tab navigation */}
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            {/* Add the Chat screen here */}
            {/* <Stack.Screen
              name="Chat"
              component={Chat}
              options={({ route }) => ({ title: `Chat with ${route.params.fullname}` })}
            /> */}
          </>
        ) : (
          <>
            {/* Login and SignUp screens */}
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
            >
              {({ navigation }) => (
                <LoginPage navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{ headerShown: false }}
            >
              {({ navigation }) => (
                <SignUpPage navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Text } from "react-native";

// const Stack = createStackNavigator();

// const HomeScreen = () => <Text>Home Screen</Text>;

// const NavigationStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
//   );
// };

// export default () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <NavigationContainer>
//         <NavigationStack />
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// };
import React, { useEffect } from "react";
import StartScreen from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { LogBox } from "react-native";
import { db } from "./firebaseConfig"; // Import the db from firebaseConfig
import { disableNetwork, enableNetwork } from "firebase/firestore";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Use NetInfo to monitor connection status
  const netInfo = useNetInfo();

  // Effect to enable/disable Firestore network based on connection status
  useEffect(() => {
    const toggleFirestoreNetwork = async () => {
      if (netInfo.isConnected) {
        await enableNetwork(db); // Enable Firestore network
      } else {
        await disableNetwork(db); // Disable Firestore network
      }
    };

    toggleFirestoreNetwork();
  }, [netInfo.isConnected]);

  // Wrapper component for Chat
  const ChatScreen = ({ route, navigation }) => (
    <Chat
      route={route}
      navigation={navigation}
      isConnected={netInfo.isConnected}
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen} // Use the wrapper component here
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useActionSheet } from "@expo/react-native-action-sheet";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, userID }) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
            return;
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissions.granted) {
      Alert.alert("Media library access is required to choose an image.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      // Handle the image upload here
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissions.granted) {
      Alert.alert("Camera access is required to take a photo.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      // Handle the image upload here
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (!permissions.granted) {
      Alert.alert("Location access is required to send your location.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const message = {
        _id: Math.random().toString(36).substring(7),
        text: "My current location",
        createdAt: new Date(),
        user: {
          _id: userID,
          name: "Your Name Here",
        },
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
      };

      if (onSend) {
        onSend([message]);
      }
    } else {
      Alert.alert("Error occurred while fetching location.");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;

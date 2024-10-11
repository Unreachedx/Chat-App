import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default color

  const onPress = () => {
    navigation.navigate('Chat', { name, backgroundColor: selectedColor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Title</Text>
      
      <View style={styles.spacer} />
      
      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Enter your name'
      />
      
      <View style={styles.spacer} />
      
      <Text style={styles.label}>Choose Background Color</Text>
      <View style={styles.colorOptions}>
        {['#090C08', '#474056', '#8A95A5', '#B9C6AE'].map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorOption, { backgroundColor: color }]}
            onPress={() => setSelectedColor(color)} // Set selected color
          />
        ))}
      </View>
      
      <View style={styles.spacer} />
      
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
      
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#757083',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    textAlign: 'left',
  },
  textInput: {
    borderColor: '#757083',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#757083',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spacer: {
    flex: 1,
  },
});

export default StartScreen;

import { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
        left: {
          backgroundColor: "#FFF",
        },
      }}
    />;
  };

  useEffect(() => {
    // Set the navigation title and set up messages when component mounts
    navigation.setOptions({ title: name });
    
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);

    // Reset messages when component unmounts
    return () => {
      setMessages([]); 
    };
  }, [navigation, name]);  // Added dependencies to ensure effect updates properly

  const handlePress = () => {
    // Implement the logic for the "More options" button here
    console.log("More options pressed");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      style={[styles.container, { backgroundColor }]}>
      
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
      />
    </KeyboardAvoidingView>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',  // Example button style, customize as needed
  },
});

export default Chat;

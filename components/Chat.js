import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { query, collection, orderBy, onSnapshot, getFirestore, addDoc } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions'; // Make sure this path is correct
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, isConnected }) => {
  const { name, backgroundColor, userID } = route.params;  
  const [messages, setMessages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesFirestore = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
            location: data.location // Make sure to include location
          };
        });
        setMessages(messagesFirestore);
        cacheMessages(messagesFirestore);
      });
      return () => unsubscribe();
    } else {
      loadCachedMessages();
    }
  }, [db, navigation, name, isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('cached_messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log("Error caching messages: ", error);
    }
  };

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('cached_messages');
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.log("Error loading cached messages: ", error);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return isConnected ? <InputToolbar {...props} /> : null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} onSend={onSend} />; // Pass onSend prop here
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;

    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }

    return null; // Return null if there's no location
  };

  const onSend = (newMessages) => {
    newMessages.forEach((message) => {
      // Ensure user is included in the message
      const msgToSend = {
        ...message,
        user: {
          _id: userID, // Make sure userID is defined
          name: name // You can also include the user's name if needed
        }
      };
  
      console.log('Sending message:', msgToSend); // Debug log to check the message structure
      addDoc(collection(db, "messages"), msgToSend)
        .then(() => {
          console.log("Message sent successfully!");
        })
        .catch((error) => {
          console.error("Error adding message: ", error);
        });
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

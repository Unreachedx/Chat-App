import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { query, collection, orderBy, onSnapshot, getFirestore, addDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, isConnected }) => {
  const { name, backgroundColor, userID } = route.params;  
  const [messages, setMessages] = useState([]);

  const db = getFirestore();

  const onSend = async (newMessages) => {
    const message = newMessages[0];
    await addDoc(collection(db, "messages"), {
      ...message,
      createdAt: Timestamp.now(),
      user: {
        _id: userID,
        name: name
      }
    });
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
    // Render the input toolbar only if connected
    if (isConnected) {
      return <InputToolbar {...props} />;
    }
    return null; // Do not render anything if offline
  };

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
            user: data.user
          };
        });

        // Set messages from Firestore and cache them
        setMessages(messagesFirestore);
        cacheMessages(messagesFirestore);
      });

      return () => unsubscribe();
    } else {
      // Load cached messages when offline
      loadCachedMessages();
    }
  }, [db, navigation, name, isConnected]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={[styles.container, { backgroundColor }]}>
      
      <GiftedChat
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID, 
          name: name   
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
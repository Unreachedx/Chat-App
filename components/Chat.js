import { useEffect, useState } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { query, collection, orderBy, onSnapshot, getFirestore, addDoc, Timestamp } from 'firebase/firestore';

const Chat = ({ route, navigation }) => {
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

  useEffect(() => {
    navigation.setOptions({ title: name });

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
      
      setMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, [db, navigation, name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'} // Adjust the behavior based on platform
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      style={[styles.container, { backgroundColor }]}>
      
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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
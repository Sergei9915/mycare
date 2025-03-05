import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Bubble,
  Composer,
} from 'react-native-gifted-chat';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { SafeAreaView } from 'react-native';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = auth.currentUser;
  const chatId = 'admin_chat';
  const insets = useSafeAreaInsets();

  const CustomInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 18,
          borderWidth: 0.5,
          borderColor: '#A4A4A4',
          backgroundColor: 'transparent',
        }}
      />
    );
  };

  useEffect(() => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt?.toDate() || new Date(),
          user: data.user,
        };
      });
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const message = newMessages[0];
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text: message.text,
      createdAt: serverTimestamp(),
      user: {
        _id: user?.uid,
        name: user?.displayName || 'Клиент',
        avatar: user?.photoURL || null,
      },
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Косметолог</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.uid,
          name: user?.displayName || 'Клиент',
          avatar: user?.photoURL || undefined,
        }}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: styles.leftBubble,
              right: styles.rightBubble,
            }}
            textStyle={{
              left: styles.leftText,
              right: styles.rightText,
            }}
          />
        )}
        renderInputToolbar={props => <CustomInputToolbar {...props} />}
        renderComposer={props => (
          <Composer
            {...props}
            placeholder="Повідомлення"
            placeholderTextColor="#575757"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  header: { fontSize: 16, fontFamily: 'NotoSansRegular' },
  leftBubble: {
    backgroundColor: '#E8F5E9',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  rightBubble: {
    backgroundColor: '#134F22',
    borderRadius: 18,
  },
  leftText: { color: '#000' },
  rightText: { color: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

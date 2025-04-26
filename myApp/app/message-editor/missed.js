import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import useCallListener from './CallListener'; // Keep this line only


export default function MissedEditor() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [defaultMessage, setDefaultMessage] = useState(null);
  const [callNumber, setCallNumber] = useState('');
  const baseUrl = 'http://192.168.159.72:5000';  // Your backend API URL

  // Use the custom hook for call detection
  useCallListener(baseUrl, setCallNumber);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/messages/missed`);
      setMessages(res.data.messages);
      setDefaultMessage(res.data.defaultMessage);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Load error' });
    }
  };

  const addMessage = async () => {
    if (message.trim() === '') return;
    try {
      const res = await axios.post(`${baseUrl}/api/messages/missed`, { message });
      setMessages(res.data.messages);
      setMessage('');
      Toast.show({ type: 'success', text1: 'Added!' });
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Add failed' });
    }
  };

  const setAsDefault = async (msg) => {
    try {
      await axios.put(`${baseUrl}/api/messages/missed/default`, { message: msg.message });
      setDefaultMessage(msg.message);
      Toast.show({ type: 'success', text1: 'Default set' });
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Set default failed' });
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/messages/missed/${id}`);
      setMessages(res.data.messages);
      Toast.show({ type: 'info', text1: 'Deleted' });
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Delete failed' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Missed Call Messages</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Add" onPress={addMessage} />
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, item.message === defaultMessage && styles.defaultText]}>
                {item.message}
              </Text>
              {item.message === defaultMessage && <Text style={styles.defaultLabel}>Default</Text>}
            </View>
            <View style={styles.icons}>
              <Ionicons name="checkmark-circle" size={24} color="blue" onPress={() => setAsDefault(item)} />
              <Ionicons name="trash" size={24} color="red" onPress={() => deleteMessage(item._id)} />
            </View>
          </View>
        )}
      />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  text: { color: '#333' },
  defaultText: { color: 'green', fontWeight: 'bold' },
  defaultLabel: { fontSize: 12, color: 'green' },
  icons: { flexDirection: 'row', gap: 10 },
});

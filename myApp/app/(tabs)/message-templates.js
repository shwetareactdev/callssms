import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MessageTemplatesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Message Details</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/message-editor/incoming')}>
        <Ionicons name="call" size={36} color="#1d4ed8" style={styles.icon} />
        <View>
          <Text style={styles.title}>Template For Incoming Call</Text>
          <Text style={styles.description}>
            Thank you note message templates you want to set for incoming calls.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/message-editor/missed')}>
        <Ionicons name="call-outline" size={36} color="#f59e0b" style={styles.icon} />
        <View>
          <Text style={styles.title}>Template For Missed Call</Text>
          <Text style={styles.description}>
            Message templates you want to set for missed calls.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/message-editor/outgoing')}>
        <Ionicons name="call-sharp" size={36} color="#10b981" style={styles.icon} />
        <View>
          <Text style={styles.title}>Template For Outgoing Call</Text>
          <Text style={styles.description}>
            Courtesy message templates you want to set for outgoing calls.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fef6ff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e1e1e',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e0f2fe',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  description: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
    maxWidth: 250,
  },
});

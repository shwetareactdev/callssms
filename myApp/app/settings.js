import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Platform, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


export default function SettingsScreen() {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === 'dark');

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    // Apply dark theme using context or library if needed
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            await AsyncStorage.clear(); // or removeItem('token') if you're storing a token
            router.replace('/auth/login');
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>⚙️ Settings</Text> */}

      <View style={styles.item}>
        <Text style={styles.label}>Dark Theme</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/home')}>
        <Text style={styles.label}>👤 Personal Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/changepassword')}>
        <Text style={styles.label}>🔐 Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/subscription')}>
        <Text style={styles.label}>💳 Subscription Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Text style={styles.label}>🚪 Logout</Text>
      </TouchableOpacity>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  item: {
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
  },
});

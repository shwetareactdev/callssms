import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import API from "../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePasswordScreen() {
  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChangePassword = async () => {
    if (!form.email || !form.oldPassword || !form.newPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      await API.post("/auth/change-password", form);
      Alert.alert("Success", "Password changed successfully");
      setForm({ email: "", oldPassword: "", newPassword: "" });
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Old Password"
        style={styles.input}
        secureTextEntry
        value={form.oldPassword}
        onChangeText={(text) => setForm({ ...form, oldPassword: text })}
      />

      <TextInput
        placeholder="New Password"
        style={styles.input}
        secureTextEntry
        value={form.newPassword}
        onChangeText={(text) => setForm({ ...form, newPassword: text })}
      />

      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});

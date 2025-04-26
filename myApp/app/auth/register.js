import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import API from "../lib/api";
import { router } from "expo-router";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  businessName: "",
};

export default function RegisterScreen() {
  const [form, setForm] = useState(initialForm);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.phoneNumber || !form.businessName) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }

    try {
      await API.post("/auth/register", form);
      Alert.alert("Success", "Account created!");
      router.replace("/auth/login");
    } catch (err) {
      Alert.alert("Registration Failed", err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {Object.keys(initialForm).map((field) => (
        <TextInput
          key={field}
          placeholder={field.replace(/([A-Z])/g, " $1")}
          value={form[field]}
          onChangeText={(text) => setForm({ ...form, [field]: text })}
          style={styles.input}
          secureTextEntry={field === "password"}
          keyboardType={field === "phoneNumber" ? "phone-pad" : "default"}
          autoCapitalize={field === "email" ? "none" : "words"}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    color: "#4CAF50",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "500",
  },
});

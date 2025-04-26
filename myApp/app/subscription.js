import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import API from "./lib/api";
import { getToken } from "./lib/auth";
import { useRouter } from "expo-router";

const plans = [
  { plan: "gold", type: "monthly" },
  { plan: "gold", type: "yearly" },
  { plan: "premium", type: "monthly" },
  { plan: "premium", type: "yearly" },
];

export default function Subscription() {
  const router = useRouter();

  const selectPlan = async (plan, type) => {
    const token = await getToken();

    try {
      await API.post(
        "/subscription",
        { plan, type },
        { headers: { Authorization: token } }
      );

      Alert.alert("Success", `Subscribed to ${plan} - ${type}`);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.log("Subscription error:", err);

      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Subscription failed. Please try again later.";

      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Subscription Plan</Text>

      {plans.map((p, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => selectPlan(p.plan, p.type)}
          style={[
            styles.planButton,
            {
              backgroundColor: p.plan === "gold" ? "#FFD700" : "#DAA520",
            },
          ]}
        >
          <Text style={styles.planText}>
            {p.plan.toUpperCase()} - {p.type.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  planButton: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  planText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchImage = async () => {
      setImageUri(
        "https://media.licdn.com/dms/image/v2/C4D0BAQE0ukTaVNfpgg/company-logo_200_200/company-logo_200_200/0/1645947322571/webmatixmarketing_logo?e=2147483647&v=beta&t=gx0nyXRf5VTxqsKolWxOTWxi-LARAYw_TPcjtYuIh78"
      );
    };
    fetchImage();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {/* Auto Messages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auto Messages</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/message-editor/incoming")}
          >
            <Text style={styles.cardTitle}>Incoming Call</Text>
            <Text style={styles.cardText}>Tap to edit message for incoming calls.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/message-editor/outgoing")}
          >
            <Text style={styles.cardTitle}>Outgoing Call</Text>
            <Text style={styles.cardText}>Tap to edit message for outgoing calls.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/message-editor/missed")}
          >
            <Text style={styles.cardTitle}>Missed Call</Text>
            <Text style={styles.cardText}>Tap to edit message for missed calls.</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* WhatsApp Chatbot Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WhatsApp Chatbot</Text>
        <Text style={styles.sectionText}>This section will contain a WhatsApp chatbot.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Open WhatsApp Chatbot")}
        >
          <Text style={styles.buttonText}>Open WhatsApp Chatbot</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  horizontalScroll: {
    gap: 12,
  },
  card: {
    width: screenWidth * 0.75,
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#0078d4",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0078d4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// // screens/admin/AdminScreen.tsx
// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
// import { router } from "expo-router";
// import { isAdminUser } from "./lib/isAdmin";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// export default function AdminScreen() {
//   const [userCount, setUserCount] = useState<number | null>(null);
//   const [subscriptionCount, setSubscriptionCount] = useState<number | null>(null);

//   useEffect(() => {
//     const verifyAdmin = async () => {
//       const isAdmin = await isAdminUser();
//       if (!isAdmin) {
//         Alert.alert("Access Denied", "You are not an admin.");
//         router.replace("/home");
//       }
//     };
//     verifyAdmin();
//   }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const userRes = await axios.get("http://192.168.32.92:5000/admin/user-count");
//         setUserCount(userRes.data.count);

//         const subRes = await axios.get("http://192.168.32.92:5000/admin/active-subscription-count");
//         setSubscriptionCount(subRes.data.count);
//       } catch (error) {
//         Alert.alert("Error", "Failed to fetch stats");
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("token");
//     router.replace("/auth/login");
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Admin Dashboard</Text>
//       <Text style={styles.subtitle}>Welcome, Admin!</Text>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Total Users</Text>
//         <Text style={styles.cardValue}>{userCount !== null ? userCount : "Loading..."}</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Active Subscriptions</Text>
//         <Text style={styles.cardValue}>
//           {subscriptionCount !== null ? subscriptionCount : "Loading..."}
//         </Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={() => router.push("/home")}>
//         <Text style={styles.buttonText}>Manage Users</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={() => router.push("/home")}>
//         <Text style={styles.buttonText}>View Logs</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, { backgroundColor: "#ff5252" }]} onPress={handleLogout}>
//         <Text style={styles.buttonText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     alignItems: "center",
//     backgroundColor: "#f4f6f8",
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: "#555",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     width: "100%",
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: "#777",
//   },
//   cardValue: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 8,
//   },
//   button: {
//     backgroundColor: "#1e90ff",
//     padding: 16,
//     borderRadius: 10,
//     width: "100%",
//     alignItems: "center",
//     marginTop: 12,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });




//admin.tsx file 
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Modal,
// } from "react-native";
// import { router } from "expo-router";
// import { isAdminUser } from "./lib/isAdmin";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   phoneNumber?: string;
//   businessName?: string;
//   subscription?: {
//     plan?: string;
//     type?: string;
//     active: boolean;
//     startDate?: string;
//     endDate?: string;
//   };
// };

// export default function AdminScreen() {
//   const [userCount, setUserCount] = useState<number | null>(null);
//   const [subscriptionCount, setSubscriptionCount] = useState<number | null>(null);
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const verifyAdmin = async () => {
//       const isAdmin = await isAdminUser();
//       if (!isAdmin) {
//         Alert.alert("Access Denied", "You are not an admin.");
//         router.replace("/home");
//       }
//     };
//     verifyAdmin();
//   }, []);

//   useEffect(() => {
//     const fetchStatsAndUsers = async () => {
//       try {
//         const [userRes, subRes, usersRes] = await Promise.all([
//           axios.get("http://192.168.1.11:5000/admin/user-count"),
//           axios.get("http://192.168.1.11:5000/admin/active-subscription-count"),
//           axios.get("http://192.168.1.11:5000/admin/users"),
//         ]);

//         setUserCount(userRes.data.count);
//         setSubscriptionCount(subRes.data.count);
//         setUsers(usersRes.data.users);
//       } catch (error) {
//         Alert.alert("Error", "Failed to fetch data");
//       }
//     };

//     fetchStatsAndUsers();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("token");
//     router.replace("/auth/login");
//   };

//   const openUserModal = (user: User) => {
//     setSelectedUser(user);
//     setModalVisible(true);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Admin Dashboard</Text>
//       <Text style={styles.subtitle}>Welcome, Admin!</Text>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Total Users</Text>
//         <Text style={styles.cardValue}>{userCount ?? "Loading..."}</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Active Subscriptions</Text>
//         <Text style={styles.cardValue}>{subscriptionCount ?? "Loading..."}</Text>
//       </View>

//       <Text style={styles.sectionTitle}>👥 User List</Text>
//       {users.map((user) => (
//         <TouchableOpacity
//           key={user._id}
//           style={styles.userItem}
//           onPress={() => openUserModal(user)}
//         >
//           <Text style={styles.userName}>{user.name}</Text>
//           <Text style={styles.userEmail}>{user.email}</Text>
//         </TouchableOpacity>
//       ))}

//       <TouchableOpacity style={[styles.button, { backgroundColor: "#ff5252" }]} onPress={handleLogout}>
//         <Text style={styles.buttonText}>Logout</Text>
//       </TouchableOpacity>

//       {/* Modal for user details */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>User Details</Text>
//             <Text style={styles.modalLabel}>🧑 Name: {selectedUser?.name}</Text>
//             <Text style={styles.modalLabel}>📧 Email: {selectedUser?.email}</Text>
//             <Text style={styles.modalLabel}>📞 Phone: {selectedUser?.phoneNumber || "N/A"}</Text>
//             <Text style={styles.modalLabel}>🏢 Business: {selectedUser?.businessName || "N/A"}</Text>
//             <Text style={styles.modalLabel}>💳 Plan: {selectedUser?.subscription?.plan || "N/A"}</Text>
//             <Text style={styles.modalLabel}>🕒 Type: {selectedUser?.subscription?.type || "N/A"}</Text>
//             <Text style={styles.modalLabel}>
//               📅 Start: {selectedUser?.subscription?.startDate?.slice(0, 10) || "N/A"}
//             </Text>
//             <Text style={styles.modalLabel}>
//               ⏳ End: {selectedUser?.subscription?.endDate?.slice(0, 10) || "N/A"}
//             </Text>

//             <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     backgroundColor: "#f4f6f8",
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: "#555",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: "#777",
//   },
//   cardValue: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 8,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginVertical: 10,
//   },
//   userItem: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: 10,
//     borderColor: "#ddd",
//     borderWidth: 1,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   userEmail: {
//     fontSize: 14,
//     color: "#555",
//   },
//   button: {
//     padding: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 24,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 24,
//     borderRadius: 16,
//     width: "90%",
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   modalLabel: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   closeButton: {
//     backgroundColor: "#1e90ff",
//     marginTop: 20,
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   closeText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { router } from "expo-router";
import { isAdminUser } from "./lib/isAdmin"; // Ensure this helper file is present
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AdminScreen() {
  const [userCount, setUserCount] = useState(null);
  const [subscriptionCount, setSubscriptionCount] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const isAdmin = await isAdminUser();
      if (!isAdmin) {
        Alert.alert("Access Denied", "You are not an admin.");
        router.replace("/home");
      }
    };
    verifyAdmin();
  }, []);

  useEffect(() => {
    const fetchStatsAndUsers = async () => {
      try {
        const [userRes, subRes, usersRes] = await Promise.all([
          axios.get("http://192.168.1.11:5000/admin/user-count"),
          axios.get("http://192.168.1.11:5000/admin/active-subscription-count"),
          axios.get("http://192.168.1.11:5000/admin/users"),
        ]);

        setUserCount(userRes.data.count);
        setSubscriptionCount(subRes.data.count);
        setUsers(usersRes.data.users);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch data");
      }
    };

    fetchStatsAndUsers();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/auth/login");
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, Admin!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Users</Text>
        <Text style={styles.cardValue}>{userCount ?? "Loading..."}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Active Subscriptions</Text>
        <Text style={styles.cardValue}>{subscriptionCount ?? "Loading..."}</Text>
      </View>

      <Text style={styles.sectionTitle}>👥 User List</Text>
      {users.map((user) => (
        <TouchableOpacity
          key={user._id}
          style={styles.userItem}
          onPress={() => openUserModal(user)}
        >
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={[styles.button, { backgroundColor: "#ff5252" }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for user details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>User Details</Text>
            <Text style={styles.modalLabel}>🧑 Name: {selectedUser?.name}</Text>
            <Text style={styles.modalLabel}>📧 Email: {selectedUser?.email}</Text>
            <Text style={styles.modalLabel}>📞 Phone: {selectedUser?.phoneNumber || "N/A"}</Text>
            <Text style={styles.modalLabel}>🏢 Business: {selectedUser?.businessName || "N/A"}</Text>
            <Text style={styles.modalLabel}>💳 Plan: {selectedUser?.subscription?.plan || "N/A"}</Text>
            <Text style={styles.modalLabel}>🕒 Type: {selectedUser?.subscription?.type || "N/A"}</Text>
            <Text style={styles.modalLabel}>
              📅 Start: {selectedUser?.subscription?.startDate?.slice(0, 10) || "N/A"}
            </Text>
            <Text style={styles.modalLabel}>
              ⏳ End: {selectedUser?.subscription?.endDate?.slice(0, 10) || "N/A"}
            </Text>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f4f6f8",
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: "#777",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  userItem: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "90%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: "#1e90ff",
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});




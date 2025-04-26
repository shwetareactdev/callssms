// import React, { useEffect, useState } from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Pressable, ActivityIndicator } from 'react-native';
// import { Link, Tabs, useRouter } from 'expo-router';
// import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/components/useColorScheme';
// import { useClientOnlyValue } from '@/components/useClientOnlyValue';
// import { isAdminUser } from '../lib/isAdmin';
// import { clearToken } from '../lib/auth';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const router = useRouter();

//   const [isAdmin, setIsAdmin] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const checkRole = async () => {
//       const admin = await isAdminUser();
//       setIsAdmin(admin);
//       setLoading(false);
//     };
//     checkRole();
//   }, []);

//   if (loading) {
//     return (
//       <ActivityIndicator
//         size="large"
//         color={Colors[colorScheme ?? 'light'].tint}
//         style={{ flex: 1, justifyContent: 'center' }}
//       />
//     );
//   }

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: useClientOnlyValue(false, true),
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Call UI',
//           tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
//           headerRight: () => (
//             <Link href="/settings" asChild>
//               <Pressable>
//                 {({ pressed }) => (
//                   <FontAwesome
//                     name="cog"
//                     size={24}
//                     color={Colors[colorScheme ?? 'light'].text}
//                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//                   />
//                 )}
//               </Pressable>
//             </Link>
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="message-templates"
//         options={{
//           title: 'Messages',
//           tabBarIcon: ({ color }) => <TabBarIcon name="envelope" color={color} />,
//         }}
//       />

//       {isAdmin ? (
//         <Tabs.Screen
//           name="admin"
//           options={{
//             title: 'Admin',
//             tabBarIcon: ({ color }) => <TabBarIcon name="user-secret" color={color} />,
//           }}
//         />
//       ) : (
//         <Tabs.Screen
//           name="profile"
//           options={{
//             title: 'Profile',
//             tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
//           }}
//         />
//       )}
//     </Tabs>
//   );
// }

// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
//   return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />;
// }

import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, ActivityIndicator } from 'react-native';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { isAdminUser } from '../lib/isAdmin';
import { clearToken } from '../lib/auth';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const admin = await isAdminUser();
      setIsAdmin(admin);
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors[colorScheme ?? 'light'].tint}
        style={{ flex: 1, justifyContent: 'center' }}
      />
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Call UI',
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="cog"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="message-templates"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <TabBarIcon name="envelope" color={color} />,
        }}
      />

      {isAdmin ? (
        // Show "Admin" tab if the user is an admin
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color }) => <TabBarIcon name="user-secret" color={color} />,
          }}
        />
      ) : (
        // Show "Profile" tab if the user is not an admin
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      )}
    </Tabs>
  );
}

function TabBarIcon(props) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />;
}

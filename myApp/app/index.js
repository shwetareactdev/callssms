import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/auth/login");
      }
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/images/image.png')}
        style={{ width: width, height: height, resizeMode: 'cover' }}
      />
    </View>
  );
}

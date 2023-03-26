import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../Component/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10 shadow">
          <Image
            source={require('../assets/images/6.png')}
            className="h-96 w-96"></Image>
        </View>
        <View className="mx-5 mb-20">
          <Text className="text-center font-extrabold text-4xl mb-2 text-slate-600">
            Welcome
          </Text>
          <Text className="text-center mb-10 text-sm font-bold text-slate-400">
            Aplikasi ini di buat oleh teo, ini merupakan aplikasi catatan,
            Selamat menggunakan
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            className="bg-emerald-300 p-2 rounded-lg mb-5 shadow-lg">
            <Text className="text-center text-white text-lg font-extrabold">
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="bg-white p-2 rounded-lg shadow-lg">
            <Text className="text-center text-slate-700 text-lg font-extrabold">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

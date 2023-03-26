import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../Component/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../Component/BackButton';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import Snackbar from 'react-native-snackbar';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      // navigation.goBack();
      // navigation.navigate('Home');
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        Snackbar.show({
          text: 'Password tidak cukup 6 huruf',
          duration: Snackbar.LENGTH_SHORT,
        });
        console.log(error);
      }
    } else {
      Snackbar.show({
        text: 'Email and Password required',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-auto mx-4 mb-20">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton></BackButton>
            </View>
            <Text className={`text-xl font-bold text-center text-slate-700`}>
              Sign Up
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/signup.png')}></Image>
          </View>
          <Text className="text-lg font-bold text-slate-700">Email</Text>
          <TextInput
            value={email}
            placeholder="Email"
            placeholderTextColor="#64748b"
            onChangeText={value => setEmail(value)}
            className="bg-white rounded-md shadow-md my-3 px-4 text-slate-600"
          />
          <Text className="text-slate-400">
            You can always change this later
          </Text>
          <Text className="text-lg font-bold text-slate-700 mt-3">
            Password
          </Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#64748b"
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
            className="bg-white rounded-md shadow-md my-3 px-4 text-slate-600"
          />
          <Text className="text-slate-400">
            Password must be 6-72 character
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-emerald-300 shadow-2xl p-3 mx-4 rounded-md shadow-emerald-400/60">
          <Text className="text-lg font-bold text-center text-white">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

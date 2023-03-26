import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../Component/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../Component/BackButton';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../Component/Loading';
import {setUserLoading} from '../redux/slices/user';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userLoading} = useSelector(state => state.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      // navigation.goBack();
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
          duration: Snackbar.LENGTH_SHORT,
        });
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
      <View className="flex justify-between h-auto mx-4 mb-16">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton></BackButton>
            </View>
            <Text className={`text-xl font-bold text-center text-slate-700`}>
              Sign In
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-64 w-64"
              source={require('../assets/images/login.png')}></Image>
          </View>
          <Text className="text-center font-extrabold text-2xl text-slate-700">
            Welcome Back!
          </Text>
          <Text className="text-center text-sm text-slate-400 mb-2">
            We're excited to see you again!
          </Text>
          <Text className="text-lg font-bold text-slate-500">Email</Text>
          <TextInput
            value={email}
            placeholder="Email"
            placeholderTextColor="#64748b"
            onChangeText={value => setEmail(value)}
            className="bg-white rounded-md shadow-md my-3 px-4 text-slate-600"
          />
          <Text className="text-lg font-bold text-slate-500">Password</Text>
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor="#64748b"
            secureTextEntry
            onChangeText={value => setPassword(value)}
            className="bg-white rounded-md shadow-md my-3 px-4 text-slate-600"
          />
          <TouchableOpacity className="flex-row justify-end">
            <Text className="text-slate-500">Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {userLoading ? (
          <Loading></Loading>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-emerald-300 shadow-2xl p-3 mx-4 rounded-md shadow-emerald-400/60">
            <Text className="text-lg font-extrabold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenWrapper>
  );
}

import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../Component/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../Component/BackButton';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Component/Loading';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {tripsRef} from '../config/firebase';
import {useSelector, useDispatch} from 'react-redux';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';

export default function AddTripScreen() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user);

  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && country) {
      //navigation.navigate('Home');
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user.uid,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Place And country require',
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-auto mx-4 mb-24">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton></BackButton>
            </View>
            <Text className={`text-xl font-bold text-center text-slate-700`}>
              Tambah Catatan
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/5.png')}></Image>
          </View>
          <Text className="text-lg font-bold text-slate-700">
            Dimana anda mau berbelanja?
          </Text>
          <TextInput
            value={place}
            placeholder="Tempat"
            placeholderTextColor="#64748b"
            onChangeText={value => setPlace(value)}
            className="bg-white rounded-md text-slate-600 my-3 px-4 shadow-md"
          />
          <Text className="text-lg font-bold text-slate-700">
            Tentang apa notenya?
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="deskripsi"
            placeholderTextColor="#64748b"
            value={country}
            onChangeText={value => setCountry(value)}
            className="bg-white rounded-md  text-slate-600 my-3 px-4 shadow-md"
          />
        </View>
      </View>

      <View>
        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            onPress={handleAddTrip}
            className="bg-emerald-300 shadow-2xl p-3 mx-4 rounded-2xl shadow-emerald-400/60 ">
            <View className="flex-row mx-2">
              <Text className="text-lg flex-1 font-bold text-center justify-center text-white ">
                Kirim
              </Text>
              <PaperAirplaneIcon
                size={28}
                color="white"
                className="flex-1 justify-end "
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScreenWrapper>
  );
}

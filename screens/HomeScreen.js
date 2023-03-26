import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../Component/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../Component/EmptyList';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {getDoc, getDocs, query, where} from 'firebase/firestore';
import {
  PencilIcon,
  ArrowRightOnRectangleIcon,
} from 'react-native-heroicons/outline';

const trip = [
  {
    id: 1,
    place: 'Gujrat',
    country: 'Pakistan',
  },
  {
    id: 2,
    place: 'Parepare',
    country: 'Makassa asdfasdas ad as dasd asd as dr',
  },
  {
    id: 3,
    place: 'Barru',
    country: 'MakMakassa asdfasdas ad as dasd asd as drassar',
  },
  {
    id: 4,
    place: 'Padang Baka',
    country: 'Makassa asdfasdas ad as dasd asd as dr',
  },
  {
    id: 5,
    place: 'Maros',
    country: 'Makassa asdfasdas ad as dasd asd as dr',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log('document', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper>
      <View className="flex-row justify-between items-center p-4 w-full">
        <Text
          className={`font-bold text-3xl shadow-md shadow-sky-200 text-slate-700`}>
          Beranda
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <View className="flex-row w-[70px] justify-between">
            <Text className="text-slate-700 font-bold">Logout</Text>
            <ArrowRightOnRectangleIcon color="black" size={20} />
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-emerald-50 justify-center rounded-lg mx-4 shadow-2xl mb-4 shadow-emerald-300/70">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-52 h-48"></Image>
      </View>

      <View className="px-4 space-y-3">
        <View className="flex-row justify-between">
          <Text className="font-bold text-xl text-slate-700">Recent Note</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="bg-white py-2 px-3 rounded-full">
            <View className="flex-row justify-between mx-2  w-14">
              <Text className="font-bold text-slate-700">Note</Text>
              <PencilIcon
                className="flex-1 justify-end"
                size={20}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className="bg-white rounded-full text-center px-4 py-2 mx-1">
            <Text className="text-slate-700">Makassar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full text-center px-4 py-2 mx-1">
            <Text className="text-slate-700">Mamuju</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full text-center px-4 py-2 mx-1">
            <Text className="text-slate-700">Bali</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full text-center px-4 py-2 mx-1">
            <Text className="text-slate-700">Jakarta</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full text-center px-4 py-2 mx-1">
            <Text className="text-slate-700">Papua</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-full text-center px-4 py-2 mx-1">
            <Text className="text-slate-700">Kalimantan</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={{height: 400}}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={'You Havent Data '} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="mx-1 "
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripExpense', {...item})}
                  className="bg-white p-3 w-[153px] rounded-2xl shadow-sm mb-3">
                  <View>
                    <Image
                      source={randomImage()}
                      className="w-32 h-36 mb-2"></Image>
                    <Text className="text-emerald-600 font-extrabold text-lg">
                      {item.place}
                    </Text>
                    <Text className="text-slate-700">{item.country}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

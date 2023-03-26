import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenWrapper from '../Component/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../Component/EmptyList';
import {PlusIcon} from 'react-native-heroicons/solid';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BackButton from '../Component/BackButton';
import ExpenseCard from '../Component/ExpenseCard';
import {getDoc, getDocs, query, where} from 'firebase/firestore';
import {expenseRef} from '../config/firebase';

const trip = [
  {
    id: 1,
    title: 'd',
    amount: 50,
    categori: 'food',
  },
  {
    id: 2,
    title: 'Parepare',
    amount: 53,
    categori: 'commute',
  },
  {
    id: 3,
    title: 'Barru',
    amount: 30,
    categori: 'entertaiment',
  },
  {
    id: 4,
    title: 'Padang Baka',
    amount: 10,
    categori: 'shopping',
  },
];

export default function TripExpenseScreen(props) {
  const {id, place, country} = props.route.params;
  const navigation = useNavigation();
  const [expnse, setExpense] = useState([]);

  const isFocused = useIsFocused();

  const fetchExpense = async () => {
    const q = query(expenseRef, where('tripId', '==', id));
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log('document', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setExpense(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpense();
    }
  }, [isFocused]);
  return (
    <ScreenWrapper className="flex-1">
      <View className="px-2">
        <View className="relative mt-5">
          <View className="absolute top-0 left-0">
            <BackButton></BackButton>
          </View>
          <Text className={`text-xl font-bold text-center text-slate-700`}>
            {place}
          </Text>
          <Text className={`text-xs text-center text-slate-700`}>
            {country}
          </Text>
        </View>

        <View className="flex-row  justify-center rounded-lg mx-4 shadow-2xl mb-4 ">
          <Image
            source={require('../assets/images/7.png')}
            className="w-80 h-80"></Image>
        </View>

        <View className="px-4 space-y-3">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl text-slate-700">
              List Belanja
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddExpense', {id, place, country})
              }
              className="bg-white py-2 px-4 rounded-full">
              <View className="flex-row justify-between">
                <Text className="font-bold text-slate-700 w-14">Belanja</Text>
                <PlusIcon size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{height: 400}}>
            <FlatList
              data={expnse}
              ListEmptyComponent={<EmptyList message={'You Havent Data '} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              className="mx-1 "
              renderItem={({item}) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../Component/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../Component/BackButton';
import {useNavigation} from '@react-navigation/native';
import {categoris} from '../constans/index';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {expenseRef} from '../config/firebase';
import Loading from '../Component/Loading';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';

export default function AddExpenseScreen(props) {
  let {id} = props.route.params;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categori, setCategori] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleAddExpense = async () => {
    if (title && amount && categori) {
      // navigation.goBack();
      setLoading(true);
      let doc = await addDoc(expenseRef, {
        title,
        amount,
        categori,
        tripId: id,
      });
      setLoading(false);
      if (doc && doc.id) navigation.goBack();
    } else {
      Snackbar.show({
        text: 'Place And country require',
      });
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-auto mx-4 ">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton></BackButton>
            </View>
            <Text className={`text-xl font-bold text-center text-slate-700`}>
              Belanja
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/10.png')}></Image>
          </View>
          <View className="space-y-2 mx-2 ">
            <Text className="text-lg font-bold text-slate-700">Barang</Text>
            <TextInput
              placeholder="Barang"
              placeholderTextColor="#64748b"
              className="bg-white rounded-md my-3 px-4 shadow-sm"
              value={title}
              onChangeText={value => setTitle(value)}
            />
            <Text className="text-lg font-bold text-slate-700">Amount</Text>
            <TextInput
              placeholder="Amount"
              placeholderTextColor="#64748b"
              className="bg-white rounded-md my-3 px-4 shadow-md"
              value={amount}
              onChangeText={value => setAmount(value)}
            />
          </View>
          <View className="mx-2 space-x-2">
            <Text className="font-bold text-slate-500 text-lg">Categori</Text>
            <View className="flex-row items-center flex-wrap">
              {categoris.map(cat => {
                let bgColor = 'bg-white';
                if (cat.value == categori) bgColor = 'bg-emerald-300';
                return (
                  <TouchableOpacity
                    onPress={() => setCategori(cat.value)}
                    key={cat.value}
                    className={` ${bgColor} px-2 py-2 rounded-full mb-2 mr-2`}>
                    <Text className="text-slate-500">{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>

      <View>
        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            onPress={handleAddExpense}
            className="bg-emerald-300 shadow-2xl p-3 mx-4 rounded-md shadow-emerald-400/60 mt-5 ">
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

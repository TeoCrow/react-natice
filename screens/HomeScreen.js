import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import ScreenWrapper from '../Component/ScreenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../Component/EmptyList'

import { useNavigation } from '@react-navigation/native'


const items = [
  {
    id: 1,
    place: 'Gujrat',
    country: 'Pakistan'
  },
  {
    id: 2,
    place: 'Parepare',
    country: 'Makassar'
  },
  {
    id: 3,
    place: 'Barru',
    country: 'Makassar'
  },
  {
    id: 4,
    place: 'Padang Baka',
    country: 'Mamuju'
  },
  {
    id: 5,
    place: 'Maros',
    country: 'Makassar'
  }
]

export default function HomeScreen() {
  const navigation = useNavigation()
  return (
    <ScreenWrapper>
      <View className="flex-row justify-between items-center p-4 w-full">
        <Text className={`font-bold text-3xl shadow-md shadow-sky-200 text-slate-700`}>Beranda</Text>
        <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className="text-slate-700 font-bold">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-emerald-200 justify-center rounded-lg mx-4 shadow-lg mb-4 shadow-emerald-500/50">
        <Image source={require('../assets/images/banner.png')} className="w-60 h-60"></Image>
      </View>

      <View className="px-4 space-y-3">
        <View className="flex-row justify-between">
        <Text className="font-bold text-xl text-slate-700">Recent Trips</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('AddTrip')} className="bg-white py-2 px-4 rounded-full">
          <Text className="font-bold text-slate-700">Add Ttrip</Text>
        </TouchableOpacity>
        </View>

        <View style={{height:400}}>
          <FlatList
            data={items}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"You Havent Data "} />}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent:'space-between'
            }}
            className="mx-1 "
            renderItem={({item})=>{
              return(
                <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-sm mb-3">
                  <View>
                    <Image source={randomImage()} className="w-32 h-36 mb-2"></Image>
                    <Text className="text-slate-700">{item.place}</Text>
                    <Text className="text-slate-700">{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </ScreenWrapper>


  )
}
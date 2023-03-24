import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../Component/ScreenWrapper'
import { colors } from '../theme'
import BackButton from '../Component/BackButton'

export default function AddTripScreen() {
  return (
    <ScreenWrapper>
        <View className="flex justify-between h-auto mx-4 mb-20">
            <View >
                <View className="relative mt-5">             
                    <View className="absolute top-0 left-0">
                        <BackButton></BackButton>
                    </View>
                    <Text className={`${colors.heading} text-xl font-bold text-center text-slate-700`}>Add Trip</Text>
                </View>
                <View className="flex-row justify-center my-3 mt-5">
                    <Image className="h-72 w-72" source={require('../assets/images/4.png')}></Image>
                </View>
                <Text className="text-lg font-bold text-slate-700">Where on earth</Text>
                <TextInput className="bg-white rounded-2xl my-3 px-4"/>
                <Text className="text-lg font-bold text-slate-700">Which country</Text>
                <TextInput className="bg-white rounded-2xl my-3 px-4"/>
            </View>
        </View>

        <View>
            <TouchableOpacity className="bg-emerald-500 shadow-lg p-3 mx-4 rounded-2xl shadow-emerald-400/60">

            <Text className="text-lg font-bold text-center text-white">SUBMIT</Text>
            </TouchableOpacity>
        </View>
    </ScreenWrapper>
  )
}
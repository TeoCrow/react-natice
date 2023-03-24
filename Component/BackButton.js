import { View, Text, Touchable, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
export default function BackButton() {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=> navigation.goBack()} className="bg-white w-10 h-10 rounded-full justify-center px-1 mx-auto  ">
        <ChevronLeftIcon size={30} color={colors.button}></ChevronLeftIcon>
    </TouchableOpacity>
  )
}
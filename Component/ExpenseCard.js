import { View, Text } from 'react-native'
import React from 'react'
import { categoriBG } from '../theme'

export default function ExpenseCard({item}) {

  return (
    <View style={{backgroundColor:categoriBG[item.categori]}} className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-2xl shadow-lg">
      <View>
        <Text className=" text-slate-700">{item.title}</Text>
        <Text className="text-slate-700">{item.categori}</Text>
      </View>

      <View>
        <Text className="text-slate-700">${item.amount}</Text>
      </View>

    </View>
  )
}
import { images } from '@/constants'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export function Cart() {
  const toatlItems = 10
  return (
    <TouchableOpacity className='cart-btn' onPress={() => {}}>
      <Image source={images.bag} className='size-5' resizeMode='contain' />

      {toatlItems > 0 && (
        <View className='cart-badge'>
          <Text>{toatlItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

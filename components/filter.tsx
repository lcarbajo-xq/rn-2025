import { Category } from '@/type'
import cn from 'clsx'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useState } from 'react'
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native'

export function Filter({ categories }: { categories: Category[] | null }) {
  const searchParams = useLocalSearchParams()
  const [active, setActive] = useState(searchParams?.category || 'all')

  const handlePress = (id: string) => {
    setActive(id)

    if (id === 'all') router.setParams({ category: undefined })
    else router.setParams({ category: id })
  }

  const filteredCategories = categories
    ? [{ $id: 'all', name: 'All' }, ...categories]
    : [{ $id: 'all', name: 'All' }]

  return (
    <FlatList
      data={filteredCategories}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-x-2 pb-3'
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            key={item.$id}
            className={cn(
              'filter',
              active === item.$id ? 'bg-amber-300' : 'bg-white'
            )}
            style={
              Platform.OS === 'android'
                ? { elevation: 4, shadowColor: '#878787' }
                : {}
            }
            onPress={() => handlePress(item.$id)}>
            <Text
              className={cn(
                'body-medium',
                active === item.$id ? 'text-white' : 'text-gray-200'
              )}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )
      }}
    />
  )
}

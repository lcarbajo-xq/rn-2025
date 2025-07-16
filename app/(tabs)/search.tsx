import { Cart } from '@/components/cart'
import { Filter } from '@/components/filter'
import { MenuCard } from '@/components/menu-card'
import { SearchBar } from '@/components/search-bar'
import { getCategories, getMenu } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { Category, MenuItem } from '@/type'
import cn from 'clsx'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'

export default function Tab() {
  const { category, query } = useLocalSearchParams<{
    query?: string
    category?: string
  }>()
  const {
    data: menus,
    loading,
    error,
    refetch
  } = useAppwrite({
    fn: getMenu,
    params: {
      category: category || '',
      query: query || '',
      limit: 6
    }
  })
  const { data: categories } = useAppwrite({
    fn: getCategories
  })

  useEffect(() => {
    refetch({ category: category || '', query: query || '', limit: 6 })
  }, [category, query])
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={menus}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0
          return (
            <View
              className={cn(
                'flex-1 max-w-[40%',
                !isFirstRightColItem ? 'mt-10' : 'mt-0'
              )}>
              <MenuCard item={item as MenuItem} />
            </View>
          )
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName='gap-7'
        contentContainerClassName='gap-7 px-4 pb-32'
        ListHeaderComponent={() => (
          <View className='my-5 gap-5'>
            <View className='flex-between flex-row w-full'>
              <View className='flex-start'>
                <Text className='text-primary small-bold uppercase'>
                  Search
                </Text>
                <View className='flex-start flex-row gap-x-1 mt-0.5'>
                  <Text className='paragraph-semibold text-dark-100'>
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <Cart />
            </View>
            <SearchBar />

            <Filter categories={categories as Category[]} />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results found</Text>}
      />
    </SafeAreaView>
  )
}

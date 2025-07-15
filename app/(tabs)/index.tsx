import { Cart } from '@/components/cart'
import { images, offers } from '@/constants'
import useAuthStore from '@/store/auth.store'
import cn from 'clsx'
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  const { user } = useAuthStore()
  console.log(JSON.stringify(user, null, 2))

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <FlatList
        data={offers}
        ListHeaderComponent={() => (
          <View className='flex-between flex-row w-full my-3 px-5 '>
            <View className='flex-start'>
              <Text className='small-bold text-primary'>DELIVERR TO</Text>
              <TouchableOpacity className='flex-center flex-row gap-x-1 mt-0.5'>
                <Text className='paragraph-bold text-dark-100'>Spain</Text>
                <Image
                  source={images.arrowDown}
                  className='size-3'
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
            <Cart />
          </View>
        )}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0
          return (
            <View>
              <Pressable
                android_ripple={{ color: '#ffff22' }}
                className={cn('offer-card', {
                  'flex-row-reverse': isEven,
                  'flex-row': !isEven
                })}
                style={{
                  backgroundColor: item.color
                }}>
                {({ pressed }) => (
                  <>
                    <View className='h-full w-1/2'>
                      <Image
                        source={item.image}
                        className='size-full'
                        resizeMode='contain'
                      />
                    </View>
                    <View
                      className={cn('offer-card__info', {
                        'pl-10': isEven,
                        'pr-10': !isEven
                      })}>
                      <Text className='h1-bold leading-tight text-white'>
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className='size-10'
                        resizeMode='contain'
                        tintColor='#ffffff'
                      />
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          )
        }}
        contentContainerClassName='pb-28 px-5'
      />
    </SafeAreaView>
  )
}

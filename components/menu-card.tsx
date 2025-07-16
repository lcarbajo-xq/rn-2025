import { appwriteConfig } from '@/lib/appwrite'
import { MenuItem } from '@/type'
import { Image, Platform, Text, TouchableOpacity } from 'react-native'

export function MenuCard({
  item: { name, image_url, price }
}: {
  item: MenuItem
}) {
  const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`

  return (
    <TouchableOpacity
      className='menu-card'
      style={
        Platform.OS === 'android'
          ? { elevation: 10, shadowColor: '#878787' }
          : {}
      }>
      <Image
        source={{ uri: imageUrl }}
        resizeMode='contain'
        className='size-32 absolute -top-10'
      />
      <Text className='text-center base-bold text-dark-100 mb-2'>{name}</Text>
      <Text className='body-regular text-gray-200 mb-4'>{price}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className='paragraph-bold text-primary'>Add to cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

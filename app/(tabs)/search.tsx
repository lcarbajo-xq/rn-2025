import seed from '@/lib/seed'
import { Button, SafeAreaView, Text } from 'react-native'

export default function Tab() {
  return (
    <SafeAreaView>
      <Text>Search</Text>

      <Button
        title='Seed'
        onPress={() =>
          seed().catch((error) =>
            console.error('Error seeding database', error)
          )
        }></Button>
    </SafeAreaView>
  )
}

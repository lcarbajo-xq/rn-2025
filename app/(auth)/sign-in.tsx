import CustomButton from '@/components/button'
import CustomInput from '@/components/input'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleSignIn = () => {
    if (!formValues.email || !formValues.password)
      return Alert.alert('Error', 'Please enter valid email and password')

    setIsSubmitting(true)
    try {
      Alert.alert('Success', 'User signed in successfully')
      router.replace('/')
    } catch (error) {
      if (error instanceof Error) Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput
        placeholder='m@email.com'
        value={formValues.email}
        onChangeText={(text) =>
          setFormValues((prev) => ({ ...prev, email: text }))
        }
        label='Email'
        keyboardType='email-address'
      />

      <CustomInput
        placeholder='Enter password'
        value={formValues.password}
        onChangeText={(text) =>
          setFormValues((prev) => ({ ...prev, password: text }))
        }
        label='Password'
        secureTextEntry={true}
      />
      <CustomButton
        title='Sign In'
        onPress={handleSignIn}
        isLoading={isSubmitting}
      />

      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Don&apos;t have an account?
        </Text>
        <Link className='base-bold text-primary' href='/sign-up'>
          Sign up
        </Link>
      </View>
    </View>
  )
}

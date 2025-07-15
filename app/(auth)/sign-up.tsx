import CustomButton from '@/components/button'
import CustomInput from '@/components/input'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSignUp = async () => {
    const { name, email, password } = formValues
    if (!name || !email || !password)
      return Alert.alert('Error', 'Please enter valid email and password')

    setIsSubmitting(true)
    try {
      await createUser({
        email,
        password,
        name
      })
      Alert.alert('Success', 'User signed up successfully')
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
        placeholder='John Doe'
        value={formValues.name}
        onChangeText={(text) =>
          setFormValues((prev) => ({ ...prev, name: text }))
        }
        label='Name'
        keyboardType='default'
      />
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
        title='Sign Up'
        onPress={handleSignUp}
        isLoading={isSubmitting}
      />

      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Already have an account?
        </Text>
        <Link className='base-bold text-primary' href='/sign-in'>
          Sign in
        </Link>
      </View>
    </View>
  )
}

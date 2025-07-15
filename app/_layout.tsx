import { SplashScreen, Stack } from 'expo-router'
import './globals.css'

import * as Sentry from '@sentry/react-native'

import { useFonts } from 'expo-font'
import { useEffect } from 'react'

Sentry.init({
  dsn: 'https://179bd08a624576e9c2dbadd244cbf6ed@o4509665880702976.ingest.de.sentry.io/4509671513456720'
})

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'QuickSand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'QuickSand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'QuickSand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'QuickSand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'QuickSand-Light': require('../assets/fonts/Quicksand-Light.ttf')
  })

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  return <Stack screenOptions={{ headerShown: false }} />
})

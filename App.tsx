import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as Notifications from 'expo-notifications';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useNotifications from './hooks/useNotifications';
import Navigation from './navigation';

const theme = extendTheme({
  fontConfig: {
    Comfortaa: {
      100: {
        normal: 'comfortaa',
      },
      200: {
        normal: 'comfortaa',
      },
      300: {
        normal: 'comfortaa',
      },
      400: {
        normal: 'comfortaa',
      },
      500: {
        normal: 'comfortaa',
      },
      600: {
        normal: 'comfortaa',
      },
      700: {
        normal: 'comfortaa',
      },
    }
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Comfortaa',
    body: 'Comfortaa',
    mono: 'Comfortaa',
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [expoPushToken] = useNotifications();

  // eslint-disable-next-line no-console
  console.log(`Expo Push Token : ${expoPushToken}`);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </NativeBaseProvider>
    );
  }
}

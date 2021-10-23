import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { View } from '../../components/Themed';
import { RootTabScreenProps, SignInStackScreenProps } from '../../types';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Image,
} from 'native-base';
import _loginWithAuth0 from '../../auth/Auth';

export default function SignInScreen({ navigation }: SignInStackScreenProps<'LogIn'>) {
  const logo = require('../../assets/images/mindfulbytes.png');

  return (
    <Box safeArea flex={1} p="5" py="8" width="100%" mx="auto" style={styles.container}>
      <Image size="xl" alignSelf="center" source={logo ? logo : undefined} alt="Logo" />

      <VStack space={3} mt="20">
        <Button mt="2" colorScheme="lime" _text={{ color: 'white' }} rounded="full" size="lg"
          onPress={() => {_loginWithAuth0(navigation)}}>
          Login/Signup
        </Button>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
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

export default function RegisterScreen({ navigation }: SignInStackScreenProps<'Register'>) {
  const logo = require('../../assets/images/mindfulbytes.png');

  return (
    <Box safeArea flex={1} p="5" py="8" width="100%" mx="auto" style={styles.container}>
      <Image size="xl" alignSelf="center" source={logo ? logo : undefined} alt="Logo" />

      <VStack space={3} mt="5">
        <FormControl>
          <Input placeholder="Name" size="lg" />
        </FormControl>
        <FormControl>
          <Input placeholder="Email" size="lg" keyboardType="email-address" />
        </FormControl>
        <FormControl>
          <Input type="password" placeholder="Password" size="lg" />
          <Link
            _text={{ fontSize: 'xs', fontWeight: '500', color: 'lime.500' }}
            alignSelf="flex-end"
            mt="1">
            Forgot Your Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="lime" _text={{ color: 'white' }} rounded="full" size="lg">
          Sign Up
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            Already have an account?{' '}
          </Text>
          <Link
            _text={{
              color: 'lime.500',
            }}
            onPress={() => navigation.navigate('LogIn')}>
            Login
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
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

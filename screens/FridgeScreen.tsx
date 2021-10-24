import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import {
    NativeBaseProvider,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    ChevronRightIcon,
    Icon,
    IconButton,
    HStack,
    Divider,
    ScrollView,
} from 'native-base';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

const Users = [
    { id: "Sugar", uri: require("../assets/images/swipe/sugar.png"), color: 'rgba(127, 220, 249, 0.38);' },
    { id: "Apples", uri: require('../assets/images/swipe/apple.png'), color: 'rgba(229, 115, 115, 0.38);' },
    { id: "Bananas", uri: require('../assets/images/swipe/banana.png'), color: 'rgba(218, 233, 45, 0.38);' },
    { id: "Lettuce", uri: require('../assets/images/swipe/lettuce.png'), color: 'rgba(165, 229, 115, 0.38);' },
    { id: "Onions", uri: require('../assets/images/swipe/onion.png'), color: 'rgba(213, 124, 244, 0.38);' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);' },
]

export default function FridgeScreen({ navigation }: RootTabScreenProps<'Kitchen'>) {

    return (
        <Box safeArea flex={1} p="5" width="100%" mx="auto" style={styles.container}>
            <VStack space={3}>
                <HStack space={3} alignItems="center">
                    <Input
                        w="90%"
                        InputRightElement={
                            <Icon
                                as={<MaterialIcons name="search" />}
                                size={5}
                                ml="2"
                                color="black"
                            />
                        }
                        placeholder="Search to find"
                        backgroundColor="#ECECEC"
                    />
                    <Ionicons name="cart-outline"
                        size={30}
                        ml="10"
                        color="black" />
                </HStack>
                <HStack space={3} alignItems="center">
                    <Button alignItems="center" justifyContent="center" >
                        <MaterialCommunityIcons name="fridge-outline" size={30} />
                        Fridge
                    </Button>
                </HStack>
                <Heading textAlign="center" size="md">Let's build your kitchen!{'\n'}
                    Swipe right to add these items to your inventory (or skip ahead!)
                </Heading>
            </VStack>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
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

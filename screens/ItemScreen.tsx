import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, PanResponder, Linking } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
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
    Center,
    Image,
    Wrap,
    Fab,
} from 'native-base';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import ActionButton from 'react-native-action-button';
import moment from 'moment';

export default function ItemScreen({ navigation, route }: RootStackScreenProps<'Item'>) {
    const [quantity, setQuantity] = React.useState((route.params as any).quantity);
    const name = (route.params as any).name;
    const uri = (route.params as any).uri;
    const color = (route.params as any).color;
    const expiry = new Date((route.params as any).expiry);
    const bought = new Date((route.params as any).bought);

    const removeItem = () => {
        // TODO: remove item from backend
    }

    return (
        <Box safeArea flex={1} px="5" width="100%" mx="auto" style={styles.container}>
            <VStack space={3} justifyContent="space-between">
                <HStack space={3} justifyContent="flex-end">
                    <IconButton
                        icon={<Ionicons name="close-outline"
                            size={30}
                            ml="10"
                            color="black"
                        />}
                        borderRadius="full"
                        onPress={() => navigation.goBack()}
                    />
                </HStack>
                <HStack space={3} justifyContent="center">
                    <Center width={"90%"} height={192} backgroundColor={color} borderRadius={30}>
                        <Image alt={name} source={uri} width={"80%"} height={"80%"} resizeMode="contain" />
                    </Center>
                </HStack>
                <HStack space={3} mt="5" alignItems="baseline">
                    <Heading size={"xl"}>{name}</Heading>
                    <HStack alignItems="baseline" justifyContent="flex-end" flexGrow={1}>
                        <IconButton
                            icon={<Ionicons name="remove"
                                size={30}
                                ml="10"
                                color="black"
                            />}
                            backgroundColor="#4CD48B"
                            p="0"
                            onPress={() => setQuantity(Math.max(0, quantity - 1))}
                        />
                        <Heading mx="2">{quantity}</Heading>
                        <IconButton
                            icon={<Ionicons name="add"
                                size={30}
                                ml="10"
                                color="black"
                            />}
                            backgroundColor="#4CD48B"
                            p="0"
                            onPress={() => setQuantity(quantity + 1)}
                        />
                    </HStack>
                </HStack>
                <Heading size="md" mt="5">Details:</Heading>

                <HStack space={3} mt="5" alignItems="baseline">
                    <Image source={require('../assets/images/expiration.png')} size="12" />
                    <Heading size="md">Expiration Date:{'\n'}<Text style={{ color: '#F21414' }}>{moment(expiry).format('MM/DD/YYYY')}</Text></Heading>
                </HStack>
                <HStack space={3} mt="5" alignItems="baseline">
                    <Image source={require('../assets/images/calendar.png')} size="12" />
                    <Heading size="md">Date Bought:{'\n'}<Text style={{ color: '#1452F2' }}>{moment(bought).format('MM/DD/YYYY')}</Text></Heading>
                </HStack>
                <HStack space={3} mt="5" mr="10">
                    <Image source={require('../assets/images/compost.png')} size="12" />
                    <Heading size="md">How to Compost:{'\n'}
                        <Text style={{ fontSize: 12 }}>{'\u2022'} Keep compostable items in a sealed container until ready to compost{'\n'}</Text>
                        <Text style={{ fontSize: 12 }}>{'\u2022'} Either find your nearest composting facility {' '}
                            <Text style={{color: 'blue'}} onPress={() => Linking.openURL("https://www.litterless.com/where-to-compost/")}>here</Text> or create your own! Learn how <Text onPress={() => Linking.openURL("https://learn.eartheasy.com/guides/composting/")} style={{ color: "blue" }}>here</Text>!</Text>
                    </Heading>
                </HStack>
                <HStack space={3} mt="5" alignItems="baseline" justifyContent="center">
                    <Button size="lg" rounded="full" backgroundColor="#F9CAD0" _text={{ color: 'black' }}>
                        Add to Community
                    </Button>
                    <IconButton
                        icon={<Ionicons name="trash-outline"
                            size={30}
                            ml="10"
                            color="black"
                        />}
                        p="0"
                        ml="5"
                        onPress={removeItem}
                    />
                </HStack>
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
    actionButtonIcon: {
        fontSize: 25,
        height: 25,
        color: 'white',
    },
});

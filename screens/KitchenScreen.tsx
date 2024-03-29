import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, TouchableOpacity } from 'react-native';

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
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import FridgeScreen from './FridgeScreen';
import { getFood, getUser, addFood } from '../auth/API';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Users = [
    { id: "Sugar", uri: require("../assets/images/swipe/sugar.png"), color: 'rgba(127, 220, 249, 0.38);' },
    { id: "Apples", uri: require('../assets/images/swipe/apple.png'), color: 'rgba(229, 115, 115, 0.38);' },
    { id: "Bananas", uri: require('../assets/images/swipe/banana.png'), color: 'rgba(218, 233, 45, 0.38);' },
    { id: "Lettuce", uri: require('../assets/images/swipe/lettuce.png'), color: 'rgba(165, 229, 115, 0.38);' },
    { id: "Onions", uri: require('../assets/images/swipe/onion.png'), color: 'rgba(213, 124, 244, 0.38);' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);' },
]

const onboardingItems = [
    "617515fc826eb9af1bf7fd66",
    "617516a7826eb9af1bf7fd6c",
    "61751628826eb9af1bf7fd68",
    "617516cc826eb9af1bf7fd6e",
    "6175165c826eb9af1bf7fd6a",
    "6174ffab34ca983bd2c942fc",
]

const swipeLeft = require('../assets/images/swipeLeft.png');
const skip = require('../assets/images/skip.png');

export default function KitchenScreen({ navigation }: RootTabScreenProps<'Kitchen'>) {

    let position = new Animated.ValueXY()
    const [currentIndex, setIndex] = React.useState(0);
    const [onboarding, setOnboarding] = React.useState(true);
    const [foods, setFoods] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const getInventory = async () => {
            let user = await getUser();
            if (user) {
                let inventory = user.user.inventory;
                if (inventory.length > 0) {
                    setOnboarding(false);
                }

                setLoading(true);
                let currFoods: any[] = [];
                for (let i = 0; i < onboardingItems.length; i++) {
                    let food = await getFood(onboardingItems[i]);
                    currFoods = [...currFoods, food];
                }
                setFoods(currFoods);
                setLoading(false);
            }
        }
        getInventory();
    }, []);

    const addToFridge = async (food: any) => {
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + food.defaultExpirationDays)
        let payload = {
            quantity: 1,
            expirationDate: expirationDate.toString(),
            dateAdded: new Date().toString(),
            foodID: food._id,
        }
        let response = await addFood(payload);
    }

    let rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-30deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    let rotateAndTranslate = {
        transform: [{
            rotate: rotate
        },
        ...position.getTranslateTransform()
        ]
    }

    let likeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })
    let dislikeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
    })

    let nextCardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
    })
    let nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
    })

    let panResponder: any = PanResponder.create({

        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {

            position.setValue({ x: gestureState.dx, y: gestureState.dy })
        },
        onPanResponderRelease: (evt, gestureState) => {

            if (gestureState.dx > 120) {
                // right swipe
                addToFridge(foods[currentIndex]);
                Animated.spring(position, {
                    useNativeDriver: true,
                    toValue: { x: SCREEN_WIDTH + 50, y: gestureState.dy }
                }).start(() => {
                    setIndex(currentIndex + 1);
                    position.setValue({ x: 0, y: 0 })
                })
            }
            else if (gestureState.dx < -120) {
                // left swipe
                Animated.spring(position, {
                    useNativeDriver: true,
                    toValue: { x: -SCREEN_WIDTH - 50, y: gestureState.dy }
                }).start(() => {
                    setIndex(currentIndex + 1);
                    position.setValue({ x: 0, y: 0 })
                })
            }
            else {
                Animated.spring(position, {
                    useNativeDriver: true,
                    toValue: { x: 0, y: 0 },
                    friction: 4
                }).start()
            }
        }
    })

    const renderUsers = () => {
        if (loading) {
            return null;
        }

        return foods.map((item: any, i: any) => {

            if (i < currentIndex) {
                return null
            }
            else if (i == currentIndex) {

                return (
                    <Animated.View
                        {...panResponder.panHandlers}
                        key={item._id} style={[rotateAndTranslate,
                            { height: 250, width: 210, padding: 10, position: 'absolute', alignSelf: 'center' }]}>
                        <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 28, fontWeight: '800', padding: 10 }}>YES</Text>

                        </Animated.View>

                        <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 28, fontWeight: '800', padding: 10 }}>NO</Text>

                        </Animated.View>


                        <Animated.View style={{ backgroundColor: 'white', position: 'absolute', width: 210, height: 250, borderRadius: 20, }}>
                            <Animated.View style={{ backgroundColor: item.color, position: 'absolute', width: '100%', height: '100%', borderRadius: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Image
                                    style={{ flex: 1, height: '50%', width: '50%', resizeMode: 'contain', }}
                                    source={{ uri: item.imageUrl }} />
                                <Text style={{ fontSize: 32, fontFamily: 'comfortaa', fontWeight: '800', marginBottom: 30, }}>{item.name}</Text>
                            </Animated.View>
                        </Animated.View>

                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                        key={item._id} style={[{
                            opacity: nextCardOpacity,
                            transform: [{ scale: nextCardScale }],
                            height: 250, width: 210, padding: 10, position: 'absolute', alignSelf: 'center'
                        }]}>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

                        </Animated.View>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NO</Text>

                        </Animated.View>

                        <Animated.View style={{ backgroundColor: 'white', position: 'absolute', width: 210, height: 250, borderRadius: 20, }}>
                            <Animated.View style={{ backgroundColor: item.color, position: 'absolute', width: '100%', height: '100%', borderRadius: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Image
                                    style={{ flex: 1, height: '50%', width: '50%', resizeMode: 'contain', }}
                                    source={{ uri: item.imageUrl }} />
                                <Text style={{ fontSize: 32, fontFamily: 'comfortaa', fontWeight: '800', marginBottom: 30, }}>{item.name}</Text>
                            </Animated.View>
                        </Animated.View>

                    </Animated.View >
                )
            }
        }).reverse()
    }

    const skipCard = () => {
        Animated.spring(position, {
            useNativeDriver: true,
            toValue: { x: 0, y: -SCREEN_HEIGHT }
        }).start(() => {
            setIndex(currentIndex + 1);
            position.setValue({ x: 0, y: 0 })
        })
    }

    if (currentIndex < Users.length && onboarding) {
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
                            placeholder="Search to add"
                            backgroundColor="#ECECEC"
                        />
                        <Ionicons name="cart-outline"
                            size={30}
                            ml="10"
                            color="black" />
                    </HStack>
                    <Heading textAlign="center" size="md">Let's build your kitchen!{'\n'}
                        Swipe right to add these items to your inventory (or skip ahead!)
                    </Heading>
                    <View style={{ position: 'absolute', bottom: '75%', left: 0, right: 0, }}>
                        {renderUsers()}
                    </View>
                    <HStack space={10} pt="5/6" alignItems="center" justifyContent="center">
                        <VStack space={3} alignItems="center">
                            <Heading textAlign="center">I don't{'\n'}have it</Heading>
                            <Image source={swipeLeft} style={{ width: 100, height: 80 }} />
                        </VStack>
                        <VStack space={3} alignItems="center">
                            <Heading textAlign="center">I have it{'\n'}</Heading>
                            <Image source={swipeLeft} style={{ width: 100, height: 80, transform: [{ scaleX: -1, }] }} />
                        </VStack>
                    </HStack>
                    <TouchableOpacity onPress={skipCard}>
                        <VStack space={1} alignItems="center">
                            <Heading textAlign="center">Skip</Heading>
                            <Image source={skip} style={{ width: 56, height: 48 }} />
                        </VStack>
                    </TouchableOpacity>
                </VStack>
            </Box>
        );
    } else {
        return <FridgeScreen navigation={navigation} />
    }
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

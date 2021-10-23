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
import { MaterialIcons, Ionicons } from "@expo/vector-icons"

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

export default function KitchenScreen({ navigation }: RootTabScreenProps<'Kitchen'>) {

    let position = new Animated.ValueXY()
    const [currentIndex, setIndex] = React.useState(0);

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
                console.log("here in one part")
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
                console.log("Here in second part");
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

        return Users.map((item, i) => {


            if (i < currentIndex) {
                return null
            }
            else if (i == currentIndex) {

                return (
                    <Animated.View
                        {...panResponder.panHandlers}
                        key={item.id} style={[rotateAndTranslate,
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
                                    source={item.uri} />
                                <Text style={{ fontSize: 32, fontFamily: 'comfortaa', fontWeight: '800', marginBottom: 30, }}>{item.id}</Text>
                            </Animated.View>
                        </Animated.View>

                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                        key={item.id} style={[{
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
                                    source={item.uri} />
                                <Text style={{ fontSize: 32, fontFamily: 'comfortaa', fontWeight: '800', marginBottom: 30, }}>{item.id}</Text>
                            </Animated.View>
                        </Animated.View>

                    </Animated.View >
                )
            }
        }).reverse()
    }

    return (
        <Box safeArea flex={1} p="5" width="100%" mx="auto" style={styles.container}>
            <VStack space={5}>
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
                <Heading textAlign="center">Let's build your kitchen!{'\n'}
                    Swipe right to add these items to your inventory (or skip ahead!)
                </Heading>
                <View style={{ position: 'absolute', top: '100%', left: 0, right: 0 }}>
                    {renderUsers()}
                </View>
                <HStack space={10}>
                    
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
});

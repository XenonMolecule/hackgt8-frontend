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
    { id: "1", uri: require("../assets/images/exampleCards/1.jpeg") },
    { id: "2", uri: require('../assets/images/exampleCards/2.jpeg') },
    { id: "3", uri: require('../assets/images/exampleCards/3.jpeg') },
    { id: "4", uri: require('../assets/images/exampleCards/4.jpeg') },
    { id: "5", uri: require('../assets/images/exampleCards/5.jpeg') },
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
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
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
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
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
                        key={item.id} style={[rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute', }]}>
                        <Animated.View style={{ opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 28, fontWeight: '800', padding: 10 }}>YES</Text>

                        </Animated.View>

                        <Animated.View style={{ opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 28, fontWeight: '800', padding: 10 }}>NO</Text>

                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: undefined, width: undefined, resizeMode: 'contain', borderRadius: 20 }}
                            source={item.uri} />

                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View

                        key={item.id} style={[{
                            opacity: nextCardOpacity,
                            transform: [{ scale: nextCardScale }],
                            height: SCREEN_HEIGHT-120, width: SCREEN_WIDTH, padding: 10, position: 'absolute',
                        }]}>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

                        </Animated.View>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NO</Text>

                        </Animated.View>

                        <Image
                            style={{ height: undefined, width: undefined, resizeMode: 'contain', borderRadius: 20 }}
                            source={item.uri} />

                    </Animated.View>
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
                {renderUsers()}
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

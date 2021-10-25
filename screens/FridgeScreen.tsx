import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, PanResponder, TouchableOpacity } from 'react-native';

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
    Center,
    Image,
    Wrap,
    Fab,
} from 'native-base';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import { detectFood, getFood, getUser, searchFood } from '../auth/API';

const items = [
    { id: "Sugar", uri: require("../assets/images/swipe/sugar.png"), color: 'rgba(127, 220, 249, 0.38);', category: 'other' },
    { id: "Apples", uri: require('../assets/images/swipe/apple.png'), color: 'rgba(229, 115, 115, 0.38);', category: 'other' },
    { id: "Bananas", uri: require('../assets/images/swipe/banana.png'), color: 'rgba(218, 233, 45, 0.38);', category: 'other' },
    { id: "Lettuce", uri: require('../assets/images/swipe/lettuce.png'), color: 'rgba(165, 229, 115, 0.38);', category: 'other' },
    { id: "Onions", uri: require('../assets/images/swipe/onion.png'), color: 'rgba(213, 124, 244, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
    { id: "Shrimp", uri: require('../assets/images/swipe/shrimp.png'), color: 'rgba(243, 153, 18, 0.38);', category: 'freezer' },
]

export default function FridgeScreen({ navigation }: any) {
    const [filter, setFilter] = React.useState('fridge');
    const [inventory, setInventory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const getInventory = async () => {
            let user = await getUser();
            if (user) {
                console.log(user.user);
                let inventory = user.user.inventory;
                for (let i = 0; i < inventory.length; i++) {
                    let foodData = await getFood(inventory[i].foodID);
                    inventory[i] = { ...inventory[i], ...foodData };
                }
                console.log(inventory)
                setInventory(inventory);
            }
        }
        getInventory();
    }, []);

    const getInventory = async () => {
        let user = await getUser();
        if (user) {
            console.log(user.user);
            let inventory = user.user.inventory;
            for (let i = 0; i < inventory.length; i++) {
                let foodData = await getFood(inventory[i].foodID);
                inventory[i] = { ...inventory[i], ...foodData };
            }
            console.log(inventory)
            setInventory(inventory);
        }
    }

    const itemScreen = (item: any) => {
        navigation.navigate("Item", item);
    }

    const takeImage = async () => {
        const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus.status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            let detect = await detectFood({ uri: result.uri, name: 'image.jpg', type: 'image/jpg' });
            console.log(detect.labels);
            // check each possible until one hits
            let foodData = null;
            for (let i = 0; i < detect.labels.length; i++) {
                foodData = await searchFood(detect.labels[i]);
                console.log(foodData);
                if (foodData) {
                    break;
                }
            }
            if (foodData) {
                let expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + foodData.defaultExpirationDays)
                let payload = {
                    ...foodData,
                    dateAdded: new Date().toString(),
                    expirationDate: expirationDate.toString(),
                    quantity: 1,
                    adding: true
                };
                navigation.navigate("Item", payload)
            }
        }
    };

    return (
        <Box safeArea flex={1} px="5" pb="40" width="100%" mx="auto" style={styles.container}>
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
                    <IconButton
                        icon={
                            <Ionicons name="cart-outline"
                                size={30}
                                ml="10"
                                color="black" />}
                        onPress={() => getInventory()}
                    />
                </HStack>
                <HStack space={2} justifyContent="center">
                    <Button p="2" backgroundColor={filter === 'fridge' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('fridge')}>
                        <Center><MaterialCommunityIcons name="fridge-outline" size={30} /></Center>
                        Fridge
                    </Button>
                    <Button p="2" backgroundColor={filter === 'freezer' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('freezer')}>
                        <Center><Image source={require('../assets/images/freezer.png')} size={30} /></Center>
                        Freezer
                    </Button>
                    <Button p="2" backgroundColor={filter === 'beverage' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('beverage')}>
                        <Center><MaterialIcons name="local-drink" size={30} /></Center>
                        Beverages
                    </Button>
                    <Button p="2" backgroundColor={filter === 'other' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('other')}>
                        <Center><MaterialCommunityIcons name="dots-horizontal-circle-outline" size={30} /></Center>
                        Other
                    </Button>
                    <Button p="2" backgroundColor={"white"} _text={{ color: 'black' }}>
                        <Center><Ionicons name="add-circle-outline" size={30} /></Center>
                        Add
                    </Button>
                </HStack>
                <ScrollView mb="0">
                    <Wrap direction="row" alignItems="center" justifyContent="center" space={5}>
                        {inventory.map((e: any, i) => {
                            if (e.category.toLowerCase() === filter || filter === 'fridge') {
                                return (
                                    <TouchableOpacity onPress={() => itemScreen(e)}>
                                        <Center width={75} height={75} backgroundColor={e.color} borderRadius={30}>
                                            <Image alt={e._id} src={e.imageUrl} width={"80%"} height={"80%"} resizeMode="contain" />
                                        </Center>
                                    </TouchableOpacity>
                                );
                            } else {
                                return <></>;
                            }
                        })}
                    </Wrap>
                </ScrollView>
            </VStack>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#3498db' title="Scan Item" onPress={takeImage}>
                    <Ionicons name="scan" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Scan Receipt" onPress={() => { }}>
                    <MaterialCommunityIcons name="barcode-scan" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#9b59b6' title="Add Food" onPress={() => console.log("notes tapped!")}>
                    <Ionicons name="create-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
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
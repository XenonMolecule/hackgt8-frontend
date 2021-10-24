import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
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
import { dietaryInfo, allergyInfo } from './signin/OtherPreferencesScreen';
import { getUser } from '../auth/API';
import { RootTabScreenProps } from '../types';

export default function ProfileScreen({ navigation, route }: RootTabScreenProps<'Profile'>) {
    const [user, setUser] = React.useState(null);
    const cart = require('../assets/images/cart.png');
    const recycle = require('../assets/images/recycle.png');
    const fridge = require('../assets/images/fridge.png');

    React.useEffect(() => {
        async function setup() {
            let user = await getUser();
            if (!user) {
                console.error("SHOULDN'T BE HERE!");
            }
            console.log(user);
            setUser(user.user);
        }
        setup();
    }, []);

    if (user) {
        return (
            <ScrollView>
                <Box safeArea flex={1} px="5" width="100%" mx="auto" style={styles.container}>
                    <VStack space={3}>
                        <HStack space={3} justifyContent="flex-end">
                            <IconButton
                                icon={<Ionicons name="settings-outline"
                                    size={30}
                                    ml="10"
                                    color="black"
                                />}
                                borderRadius="full"
                                onPress={() => { }}
                            />
                        </HStack>
                        {user.pictureUrl &&
                            <Center>
                                <Image src={user.pictureUrl} size="xl" />
                                <Heading>{user.name}</Heading>
                                <Heading size="md">{user.email}</Heading>
                            </Center>
                        }
                        <Heading size="sm" mt="5">Goals:</Heading>
                        <HStack flexWrap="wrap" direction="row" justifyContent="center" space={5}>
                            {user.sustainable && <Center width={"45%"} height={105} backgroundColor="#B4E7B4" borderRadius={24}>
                                <Image alt="image" source={recycle} width={"80%"} height={"50%"} resizeMode="contain" />
                                <Heading size="sm" textAlign="center">Reduce Food Waste</Heading>
                            </Center>}
                            {user.personalized && <Center width={"45%"} height={105} backgroundColor="#B4E7B4" borderRadius={24}>
                                <Image alt="image" source={cart} width={"80%"} height={"50%"} resizeMode="contain" />
                                <Heading size="sm" textAlign="center">Find Personalized Recipes</Heading>
                            </Center>}
                            {user.healthy && <Center width={"50%"} height={105} backgroundColor="#B4E7B4" borderRadius={24}>
                                <Image alt="image" source={fridge} width={"80%"} height={"50%"} resizeMode="contain" />
                                <Heading size="sm" textAlign="center">Achieve a Healthier Lifestyle</Heading>
                            </Center>}
                        </HStack>
                        <Heading size="sm" mt="5">Preferences &amp; Allergens:</Heading>
                        <HStack flexWrap="wrap" direction="row" justifyContent="center" space={2}>
                            {user.dietaryRestrictions.map((e: string, i) => (
                                <Center m="0.5" key={i} width={"30%"} height={105} backgroundColor={dietaryInfo[e].color} borderRadius={24}>
                                    <Image alt="image" source={dietaryInfo[e].image} width={"80%"} height={"50%"} resizeMode="contain" />
                                    <Heading size="sm" textAlign="center">{dietaryInfo[e].name}</Heading>
                                </Center>
                            ))}
                            {user.allergens.map((e: string, i) => (
                                <Center m="0.5" key={i + 6} width={"30%"} height={105} backgroundColor={allergyInfo[e].color} borderRadius={24}>
                                    <Image alt="image" source={allergyInfo[e].image} width={"80%"} height={"50%"} resizeMode="contain" />
                                    <Heading size="sm" textAlign="center">{allergyInfo[e].name}</Heading>
                                </Center>
                            ))}
                        </HStack>
                    </VStack>
                </Box>
            </ScrollView>
        );
    } else { return null; }
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

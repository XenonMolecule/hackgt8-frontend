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
import { getUser, getRecipes, getFood } from '../auth/API';

const ingredients = [
    { id: "Sugar", uri: require("../assets/images/swipe/sugar.png"), color: 'rgba(127, 220, 249, 0.38);', category: 'other', amt: '1 tbsp' },
    { id: "Apples", uri: require('../assets/images/swipe/apple.png'), color: 'rgba(229, 115, 115, 0.38);', category: 'other', amt: '5 ct' },
    { id: "Bananas", uri: require('../assets/images/swipe/banana.png'), color: 'rgba(218, 233, 45, 0.38);', category: 'other', amt: '2 ct' },
    { id: "Lettuce", uri: require('../assets/images/swipe/lettuce.png'), color: 'rgba(165, 229, 115, 0.38);', category: 'other', amt: '2 lb' },
    { id: "Lettuce", uri: require('../assets/images/swipe/lettuce.png'), color: 'rgba(165, 229, 115, 0.38);', category: 'other', amt: '2 lb' },
    { id: "Lettuce", uri: require('../assets/images/swipe/lettuce.png'), color: 'rgba(165, 229, 115, 0.38);', category: 'other', amt: '2 lb' },
]

const measurements = [
    "cups", "tbsp", "ct", "lb", "tsp", "qt"
]

export default function ItemScreen({ navigation, route }: RootStackScreenProps<'Item'>) {
    const name = (route.params as any).name;
    const uri = (route.params as any).uri;
    const imageUrl = (route.params as any).imageUrl;
    const foodIngredients = (route.params as any).foodIngredients;
    const instructions = (route.params as any).instructions;
    const [ingredients, setIngredients] = React.useState<any>([]);

    React.useEffect(() => {
        const getMyRecipes = async () => {
            let user = await getUser();
            if (user) {
                let currIngredients: any[] = [];
                for (let i = 0; i < foodIngredients.length; i++) {
                    let currFood = await getFood(foodIngredients[i]);
                    currFood["amt"] = Math.floor(1 + Math.random() * 6) + " " + measurements[Math.floor(Math.random() * measurements.length)];
                    currIngredients = [...currIngredients, currFood];
                }
                setIngredients(currIngredients);
            }
        }
        getMyRecipes();
    }, []);

    const stepsConverter = (str: string) => {
        return str.replace(/<[^>]*>?/gm, '');
    }

    return (
        <ScrollView>
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
                        <Center width={"100%"} height={192}>
                            <Image alt={name} src={imageUrl} width={"80%"} height={"60%"} resizeMode="cover" rounded="3xl" />
                            <Heading size={"xl"} mt="3">{name}</Heading>
                        </Center>
                    </HStack>
                    <Heading size="md" mt="5">Ingredients:</Heading>
                    <Wrap direction="row" alignItems="center" justifyContent="center" space={2}>
                        {ingredients.map((e: any, i: any) => (
                            <Center width={110} height={120} backgroundColor={e.color} borderRadius={30}>
                                <Image alt={e._id} src={e.imageUrl} width={"80%"} height={"40%"} resizeMode="contain" />
                                <Heading size="sm">{e.name}</Heading>
                                <Heading size="sm">{e.amt}</Heading>
                            </Center>
                        ))}
                    </Wrap>
                    <Heading size="md" mt="5">Steps:</Heading>
                    <Text>
                        {stepsConverter(instructions)}
                    </Text>
                </VStack>
            </Box>
        </ScrollView>
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

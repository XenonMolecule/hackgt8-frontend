import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, PanResponder, TouchableOpacity, Touchable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabParamList, RootTabScreenProps } from '../types';
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

const items = [
    { id: "'Meats' Pizza", uri: require("../assets/images/Recipes/pizza.png"), color: '#FB9D97', description: "A meatlover’s dream pizza loaded with pepperoni, sausage, and bacon." },
    { id: "Greek Salad", uri: require('../assets/images/Recipes/salad.png'), color: '#9AF29A', description: "A delicious combination of fresh spring mix, red onions, olives, tomatos, and feta cheese!" },
    { id: "Guacamole", uri: require('../assets/images/Recipes/guacamole.png'), color: '#6FBD6F', description: "*The* best dip for any event! Fresh avocados, crunchy onions, and sweet tomatos, paired with corn chips." },
    { id: "Fried Chicken", uri: require('../assets/images/Recipes/fried_chicken.png'), color: '#E4B782', description: "There’s nothing like crispy fried chicken wings! So flavorful and tender!" },
    { id: "Spicy Salmon Sashimi", uri: require('../assets/images/Recipes/sushi.png'), color: '#F5A2BB', description: "A dish that will impress anyone at a dinner party! Only 5 ingredients but oh so delicious!" },
]

export default function RecipesScreen({ navigation }: RootTabScreenProps<'Recipes'>) {
    const [filter, setFilter] = React.useState('top50');

    const recipeScreen = (item: any) => {
        // TODO: Integrate with backend for foods
        let params = {
            name: "'Meats' Pizza",
            ingredients: [],
            uri: item.uri,
            color: item.color,
            steps: '',
        }
        navigation.navigate("Recipe", params);
    }

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
                    <Ionicons name="cart-outline"
                        size={30}
                        ml="10"
                        color="black" />
                </HStack>
                <HStack space={2} justifyContent="center">
                    <Button p="2" backgroundColor={filter === 'top50' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('top50')}>
                        <Center><Image source={require('../assets/images/Recipes/trending.png')} size={30} /></Center>
                        Top 50
                    </Button>
                    <Button p="2" backgroundColor={filter === 'customized' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('customized')}>
                        <Center><Image source={require('../assets/images/Recipes/customized.png')} size={30} /></Center>
                        Customized
                    </Button>
                    <Button p="2" backgroundColor={filter === 'saved' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('saved')}>
                        <Center><Image source={require('../assets/images/Recipes/saved.png')} size={30} /></Center>
                        Saved
                    </Button>
                    <Button p="2" backgroundColor={filter === 'history' ? "#D7D1D1" : "white"} _text={{ color: 'black' }}
                        onPress={() => setFilter('history')}>
                        <Center><Image source={require('../assets/images/Recipes/history.png')} size={30} /></Center>
                        History
                    </Button>
                </HStack>
                <ScrollView mb="0">
                    <Wrap direction="row" justifyContent="center" space={5}>
                        {items.map((e, i) => (
                            <Box width={"100%"} height="32" backgroundColor={e.color} rounded="3xl">
                                <TouchableOpacity onPress={() => recipeScreen(e)}>
                                    <HStack>
                                        <Image alt={e.id} source={e.uri} width="40%" height="24" resizeMode="contain" />
                                        <VStack width="55%">
                                            <Heading size="xs" mb={2}>{e.id}</Heading>
                                            <Heading size="xs">{e.description}</Heading>
                                        </VStack>
                                    </HStack>
                                </TouchableOpacity>
                            </Box>
                        ))}
                    </Wrap>
                </ScrollView>
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

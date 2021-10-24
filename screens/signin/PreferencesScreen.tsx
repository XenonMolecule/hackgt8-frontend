import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { View } from '../../components/Themed';
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
    ChevronRightIcon,
    Icon,
    IconButton,
    HStack,
    Divider,
    Image,
    ScrollView,
} from 'native-base';
import _loginWithAuth0 from '../../auth/Auth';
import { Ionicons } from "@expo/vector-icons";

function GoalButton(props: any) {
    return (
        <Button
            mx="5"
            colorScheme="emerald"
            _text={{ color: 'black', fontSize: 'lg', textAlign: 'center' }}
            rounded="3xl"
            size="lg"
            height="26%"
            opacity={props.state ? 1 : 0.5}
            shadow={props.state ? "9" : undefined}
            {...props}>
            <Image source={props.image ? props.image : undefined} alt="image" resizeMode="contain" size="lg" alignSelf="center" />
            {props.text}
        </Button>
    );
}

function nextScreen(navigation: any, recipes: boolean, waste: boolean, kitchen: boolean) {
    navigation.navigate("OtherPreferences", { recipes, waste, kitchen });
}

export default function PreferencesScreen({ navigation, route }: SignInStackScreenProps<'Preferences'>) {
    const cart = require('../../assets/images/cart.png');
    const recycle = require('../../assets/images/recycle.png');
    const fridge = require('../../assets/images/fridge.png');
    const [recipes, setRecipes] = React.useState(false);
    const [waste, setWaste] = React.useState(false);
    const [kitchen, setKitchen] = React.useState(false);

    return (
        <ScrollView alwaysBounceVertical={false} backgroundColor="rgba(255, 255, 255, 1);">
            <Box safeArea flex={1} p="5" py="10" width="100%" mx="auto" style={styles.container}>
                <Heading textAlign="center">Hi {route.params?.name ? route.params?.name : 'Alex'}!</Heading>
                <Heading textAlign="center">What is your goal?</Heading>
                <Heading fontSize="md" mt="3" textAlign="center">Pick the preferences you want to
                    customize your experience with
                    Mindful Bytes :)</Heading>

                <VStack space={3} mt="5">
                    <GoalButton text="Find Personalized Recipes" image={cart} state={recipes} onPress={() => {
                        setRecipes(!recipes);
                    }} />
                    <GoalButton text="Reduce Food Waste" image={recycle} state={waste} onPress={() => {
                        setWaste(!waste);
                    }} />
                    <GoalButton text="Achieve a Healthier Lifestyle" image={fridge} state={kitchen} onPress={() => {
                        setKitchen(!kitchen);
                    }} />
                    <Button mt="5" width="25%" height="10"
                        backgroundColor='#AEDDCF'
                        size="lg"
                        _text={{ color: 'black', }}
                        alignSelf="flex-end"
                        rounded="xl"
                        onPress={() => { nextScreen(navigation, recipes, waste, kitchen); }}
                        endIcon={<Icon as={Ionicons} name="chevron-forward" size="sm" />}>
                        Next
                    </Button>
                </VStack>
            </Box>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1);',
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

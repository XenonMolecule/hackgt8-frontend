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
    IconButton,
    HStack,
    Divider,
    Image,
    ScrollView,
} from 'native-base';
import _loginWithAuth0 from '../../auth/Auth';

function GoalButton(props: any) {
    return (
        <Button
            mt="2"
            colorScheme="emerald"
            _text={{ color: 'black', fontSize: 'lg', textAlign: 'center' }}
            rounded="3xl"
            size="lg"
            height="48"
            borderWidth={props.state ? "1" : undefined}
            opacity={props.state ? 1 : 0.5}
            {...props}>
            <Image mb="5" source={props.image ? props.image : undefined} alt="image" resizeMode="contain" size="lg" alignSelf="center" />
            {props.text}
        </Button>
    );
}

export default function OtherPreferencesScreen({ navigation }: SignInStackScreenProps<'OtherPreferences'>) {
    const cart = require('../../assets/images/cart.png');
    const recycle = require('../../assets/images/recycle.png');
    const fridge = require('../../assets/images/fridge.png');
    const [recipes, setRecipes] = React.useState(false);
    const [waste, setWaste] = React.useState(false);
    const [kitchen, setKitchen] = React.useState(false);

    return (
        <ScrollView alwaysBounceVertical={false} backgroundColor="rgba(180, 231, 180, 0.42);">
            <Box safeArea flex={1} p="5" width="100%" mx="auto" style={styles.container}>
                <Heading textAlign="center">Hi Alex!</Heading>
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
                    <GoalButton text="Organize Your Kitchen Better" image={fridge} state={kitchen} onPress={() => {
                        setKitchen(!kitchen);
                    }} />
                    <Button mt="12" mb="10" width="25%" height="10"
                        backgroundColor='#AEDDCF'
                        size="lg"
                        _text={{ color: 'black' }}
                        alignSelf="flex-end"
                        alignItems="baseline"
                        rounded="xl">
                        <Text fontSize="md">Next<ChevronRightIcon size="8" /></Text>
                    </Button>
                </VStack>
            </Box>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'rgba(180, 231, 180, 0.42);',
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

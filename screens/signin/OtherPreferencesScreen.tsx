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
import { updateUser } from '../../auth/API';

function PreferButton(props: any) {
    return (
        <Button
            mt="2"
            p="0"
            colorScheme="emerald"
            _text={{ color: 'black', fontSize: 'md', textAlign: 'center' }}
            rounded="3xl"
            size="lg"
            width="30%"
            height="32"
            opacity={props.state ? 1 : 0.5}
            {...props}>
            <Image source={props.image ? props.image : undefined} alt="image" resizeMode="contain" size="sm" alignSelf="center" />
            {props.text}
        </Button>
    );
}

export const dietaryInfo = {
    vegan: {
        name: "vegan",
        image: require("../../assets/images/diet/vegan.png"),
        color: "rgba(134, 234, 132, 0.52);",
    },
    pescatarian: {
        name: "pescatarian",
        image: require("../../assets/images/diet/pescatarian.png"),
        color: "rgba(84, 114, 205, 0.66);",
    },
    gluten_free: {
        name: "gluten-free",
        image: require("../../assets/images/diet/gluten-free.png"),
        color: "rgba(220, 199, 86, 0.56);",
    },
    dairy_free: {
        name: "dairy-free",
        image: require("../../assets/images/diet/milk.png"),
        color: "rgba(214, 236, 127, 0.66);",
    },
    paleo: {
        name: "paleo",
        image: require("../../assets/images/diet/paleo.png"),
        color: "rgba(214, 236, 127, 0.66);",
    },
    vegetarian: {
        name: "vegetarian",
        image: require("../../assets/images/diet/vegetarian.png"),
        color: "rgba(152, 240, 182, 0.71);",
    }
}

export const allergyInfo = {
    shell: {
        name: "shellfish",
        image: require("../../assets/images/diet/shellfish.png"),
        color: "rgba(249, 176, 130, 0.54);",
    },
    sulfite: {
        name: "sulfite-free",
        image: require("../../assets/images/diet/sulfite.png"),
        color: "rgba(105, 189, 237, 0.44);",
    },
    egg: {
        name: "egg-free",
        image: require("../../assets/images/diet/egg.png"),
        color: "rgba(213, 216, 223, 0.76);",
    },
    nut: {
        name: "nut-free",
        image: require("../../assets/images/diet/nut.png"),
        color: "rgba(124, 73, 39, 0.38);",
    },
    grain: {
        name: "grain-free",
        image: require("../../assets/images/diet/grain.png"),
        color: "rgba(237, 239, 149, 0.54);",
    },
    soy: {
        name: "soy-free",
        image: require("../../assets/images/diet/soy.png"),
        color: "rgba(243, 217, 125, 0.74);",
    }
}

export default function OtherPreferencesScreen({ navigation, route }: SignInStackScreenProps<'OtherPreferences'>) {
    // Preferences:
    const _vegan = require('../../assets/images/diet/vegan.png');
    const _pescatarian = require('../../assets/images/diet/pescatarian.png');
    const _gluten_free = require('../../assets/images/diet/gluten-free.png');
    const _dairy_free = require('../../assets/images/diet/milk.png');
    const _paleo = require('../../assets/images/diet/paleo.png');
    const _vegetarian = require('../../assets/images/diet/vegetarian.png');
    const [dietary, setDietary] = React.useState({
        vegan: false,
        pescatarian: false,
        gluten_free: false,
        dairy_free: false,
        paleo: false,
        vegetarian: false,
    });

    // allergies
    const _shellfish = require('../../assets/images/diet/shellfish.png');
    const _sulfite = require('../../assets/images/diet/sulfite.png');
    const _egg = require('../../assets/images/diet/egg.png');
    const _nut = require('../../assets/images/diet/nut.png');
    const _grain = require('../../assets/images/diet/grain.png');
    const _soy = require('../../assets/images/diet/soy.png');
    const [allergen, setAllergen] = React.useState({
        shell: false,
        sulfite: false,
        egg: false,
        nut: false,
        grain: false,
        soy: false,
    });


    const nextScreen = async () => {
        let params: any = route.params;
        let dietaryRestrictions = Object.keys(dietary).filter((key: any) => {return dietary[key]});
        let allergens = Object.keys(allergen).filter((key: any) => {return allergen[key]});
        let data = {
            sustainable: params.waste,
            healthy: params.kitchen,
            personalized: params.recipes,
            dietaryRestrictions,
            allergens,
        };
        
        await updateUser(data);

        navigation.navigate("Root");
    }


    return (
        <ScrollView alwaysBounceVertical={false}>
            <Box safeArea flex={1} width="100%" mx="auto" backgroundColor="#F5FBF5" style={styles.container}>
                <Heading textAlign="center" mx="3" fontSize="2xl">Pick your preferences and dietary restrictions!</Heading>

                <VStack space={3} py="5" mt="5" backgroundColor="#F5FBF5" rounded="3xl">
                    <Heading ml="5" fontSize="xl">Preferences:</Heading>
                    <HStack space={3} mx="auto" alignItems="center">
                        <PreferButton text="vegan" image={_vegan} backgroundColor="rgba(134, 234, 132, 0.52);" state={dietary.vegan} onPress={() => {
                            setDietary({ ...dietary, vegan: !dietary.vegan })
                        }} />
                        <PreferButton text="pescatarian" image={_pescatarian} backgroundColor="rgba(84, 114, 205, 0.66);" state={dietary.pescatarian} onPress={() => {
                            setDietary({ ...dietary, pescatarian: !dietary.pescatarian })
                        }} />
                        <PreferButton text="gluten-free" image={_gluten_free} backgroundColor="rgba(220, 199, 86, 0.56);" state={dietary.gluten_free} onPress={() => {
                            setDietary({ ...dietary, gluten_free: !dietary.gluten_free })
                        }} />
                    </HStack>
                    <HStack space={3} mx="auto" alignItems="center">
                        <PreferButton text="dairy-free" image={_dairy_free} backgroundColor="rgba(218, 218, 218, 0.36);" state={dietary.dairy_free} onPress={() => {
                            setDietary({ ...dietary, dairy_free: !dietary.dairy_free })
                        }} />
                        <PreferButton text="paleo" image={_paleo} backgroundColor="rgba(214, 236, 127, 0.66);" state={dietary.paleo} onPress={() => {
                            setDietary({ ...dietary, paleo: !dietary.paleo })
                        }} />
                        <PreferButton text="vegetarian" image={_vegetarian} backgroundColor="rgba(152, 240, 182, 0.71);" state={dietary.vegetarian} onPress={() => {
                            setDietary({ ...dietary, vegetarian: !dietary.vegetarian })
                        }} />
                    </HStack>
                    <Heading ml="5" mt="3" fontSize="xl">Allergens:</Heading>
                    <HStack space={3} mx="auto" alignItems="center">
                        <PreferButton text="shellfish" image={_shellfish} backgroundColor="rgba(249, 176, 130, 0.54);" state={allergen.shell} onPress={() => {
                            setAllergen({ ...allergen, shell: !allergen.shell })
                        }} />
                        <PreferButton text="sulfite-free" image={_sulfite} backgroundColor="rgba(105, 189, 237, 0.44);" state={allergen.sulfite} onPress={() => {
                            setAllergen({ ...allergen, sulfite: !allergen.sulfite })
                        }} />
                        <PreferButton text="egg-free" image={_egg} backgroundColor="rgba(213, 216, 223, 0.76);" state={allergen.egg} onPress={() => {
                            setAllergen({ ...allergen, egg: !allergen.egg })
                        }} />
                    </HStack>
                    <HStack space={3} mx="auto" alignItems="center">
                        <PreferButton text="nut-free" image={_nut} backgroundColor="rgba(124, 73, 39, 0.38);" state={allergen.nut} onPress={() => {
                            setAllergen({ ...allergen, nut: !allergen.nut })
                        }} />
                        <PreferButton text="grain-free" image={_grain} backgroundColor="rgba(237, 239, 149, 0.54);" state={allergen.grain} onPress={() => {
                            setAllergen({ ...allergen, grain: !allergen.grain })
                        }} />
                        <PreferButton text="soy-free" image={_soy} backgroundColor="rgba(243, 217, 125, 0.74);" state={allergen.soy} onPress={() => {
                            setAllergen({ ...allergen, soy: !allergen.soy })
                        }} />
                    </HStack>
                    <Button mt="12" mb="8" mx="auto" height="10"
                        backgroundColor='#AEDDCF'
                        size="2/6"
                        _text={{ color: 'black', fontSize: 18 }}
                        rounded="xl"
                        onPress={nextScreen}>
                        Complete
                    </Button>
                </VStack>
            </Box>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        justifyContent: 'center',
        backgroundColor: '#F5FBF5',
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

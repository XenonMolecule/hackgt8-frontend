import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, PanResponder } from 'react-native';

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
import ActionButton from 'react-native-action-button';

export default function ItemScreen({ navigation, route }: RootStackScreenProps<'Item'>) {
    const [quantity, setQuantity] = React.useState((route.params as any).quantity);
    const name = (route.params as any).name;
    const uri = (route.params as any).uri;
    const color = (route.params as any).color;
    const expiry = (route.params as any).expiration;


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
                <ScrollView mb="0">
                    <Wrap direction="row" alignItems="center" justifyContent="center" space={5}>
                        
                    </Wrap>
                </ScrollView>
            </VStack>
            {/* <Fab
                position="absolute"
                size="sm"
                bottom={60}
                icon={<Ionicons color="white" name="add" size={30} />}
            /> */}
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#3498db' title="Scan Item" onPress={() => { }}>
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

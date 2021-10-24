/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RecipesScreen from '../screens/RecipesScreen';
import SignInScreen from '../screens/signin/SignInScreen';
import RegisterScreen from '../screens/signin/RegisterScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps, SignInStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import PreferencesScreen from '../screens/signin/PreferencesScreen';
import OtherPreferencesScreen from '../screens/signin/OtherPreferencesScreen';
import KitchenScreen from '../screens/KitchenScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemScreen from '../screens/ItemScreen';
import RecipeScreen from '../screens/RecipeScreen';
import { Image } from 'native-base';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Item" component={ItemScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = "light";

  return (
    <BottomTab.Navigator
      initialRouteName="Kitchen"
      screenOptions={{
        tabBarActiveBackgroundColor: '#D7D1D1',
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          height: 60,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'comfortaa'
        }
      }}>
      <BottomTab.Screen
        name="Kitchen"
        component={KitchenScreen}
        options={({ navigation }: RootTabScreenProps<'Kitchen'>) => ({
          title: 'Kitchen',
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/kitchenTab.png')} size="10" />,
        })}
      />
      <BottomTab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/recipeTab.png')} size="10" />,
        }}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/communityTab.png')} size="10" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/profileTab.png')} size="10" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * Sign In Navigator
 * 
 */

const SignIn = createNativeStackNavigator<SignInStackParamList>();

function SignInNavigator() {
  return (
    <SignIn.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'rgba(180, 231, 180, 0.42);',
      },
      headerShadowVisible: false,
      headerTitle: '',
      headerBackTitle: '',
      headerTintColor: '#84cc16',
    }}>
      <SignIn.Screen name="LogIn" component={SignInScreen} options={{ headerShown: false }} />
      <SignIn.Screen name="Preferences" component={PreferencesScreen} options={{ headerShown: false }} />
      <SignIn.Screen name="OtherPreferences" component={OtherPreferencesScreen} options={{ headerShown: false }} />
    </SignIn.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Kitchen: {
            screens: {
              KitchenScreen: 'kitchen',
            },
          },
          Recipes: {
            screens: {
              RecipesScreen: 'recipes',
            },
          },
          Community: {
            screens: {
              CommunityScreen: 'community',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
      SignIn: {
        screens: {
          LogIn: {
            screens: {
              SignInScreen: 'signin',
            },
          },
          Preferences: {
            screens: {
              PreferencesScreen: 'preferences',
            }
          },
          OtherPreferences: {
            screens: {
              OtherPreferencesScreen: 'other',
            }
          }
        }
      }
    },
  },
};

export default linking;

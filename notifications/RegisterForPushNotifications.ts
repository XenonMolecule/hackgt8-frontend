import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * Request push notification permissions if permission is not already granted, and returns the Expo push token.
 * (This code is derived from the Expo documentation at https://docs.expo.io/push-notifications/overview/#usage, which is licensed under the MIT license.)
 * @returns {string | null} Expo push token if permission granted, else null
 */
export default async function registerForPushNotifications() {
    let token: string;
    // Push notifications only work for physical devices
    if (Constants.isDevice) {
        // Check if the user has already given push notification permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // We need to request the ability to push to the user device
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        // Permission Denied :(
        if (finalStatus !== 'granted') {
            // eslint-disable-next-line no-alert
            alert('Failed to get push token for push notification!');
            return null;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        // eslint-disable-next-line no-alert
        alert('Must use physical device for Push Notifications');
    }

    // On Android we have some additional settings to initialize
    // specifically that notifications are on the default channel
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    // @ts-ignore token is assigned by this point; no need to worry about use before assignment
    return token;
}

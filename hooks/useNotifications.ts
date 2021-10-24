import { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from '../notifications/RegisterForPushNotifications';
import {updatePushTokens} from "../auth/API";

type Subscription = {
    remove: () => void;
};

/**
 * Request permissions to send notifications if permission is not already granted, and then return the Expo push token
 * (push token for your installation of the app) and notification (either "false" or the notification).
 * Also adds listeners for when notifications are received.
 * (Portions of this code are derived from the Expo documentation at https://github.com/expo/expo/blob/master/docs/pages/push-notifications/overview.md, which is under the MIT license.)
 * @returns expoPushToken, notification
 */
export default function useCachedResources(): [string | undefined | null, boolean | Notifications.Notification] {
    const [expoPushToken, setExpoPushToken] = useState<string | undefined | null>('');
    const [notification, setNotification] = useState<boolean | Notifications.Notification>(false);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            updatePushTokens(token);
            setExpoPushToken(token);
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts
        // with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            // eslint-disable-next-line no-console
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener as unknown as Subscription);
            Notifications.removeNotificationSubscription(responseListener as unknown as Subscription);
        };
    }, []);

    return [expoPushToken, notification];
}

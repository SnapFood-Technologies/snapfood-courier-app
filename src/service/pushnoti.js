import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { EventRegister } from 'react-native-event-listeners';
import { CONSTANTS, GLOBAL } from '_service';

export const setupPush = () => {
    PushNotification.createChannel(
        {
            channelId: CONSTANTS.NOTIFICATION_CHANNEL,
            channelName: CONSTANTS.NOTIFICATION_CHANNEL,
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log('TOKEN:', token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification, GLOBAL.isLoggedIn);
            // process the notification
            if (!notification.userInteraction) { // app not opened from notification
                showLocalNotification(notification);
            }
            GLOBAL.unHandledNotification = notification;
            EventRegister.emit(CONSTANTS.NOTIFICATION_RECEIVED, notification);

            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log('ACTION:', notification.action);
            console.log('NOTIFICATION:', notification);
            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.log(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });

    messaging().setBackgroundMessageHandler(async (remoteMsg) => { 
        console.log('Message handled in the background!', remoteMsg);
        showLocalNotification(remoteMsg.notification);
        GLOBAL.unHandledNotification = remoteMsg;
        EventRegister.emit(CONSTANTS.NOTIFICATION_RECEIVED, remoteMsg);
    });
}

export const showLocalNotification = (notification) => {
    console.log('showLocalNotification ', notification)
    const { title, subTitle, message, body, picture , data } = notification; 
    let notiData = {
        title: title, // (optional)
        message: message || body, // (required)
        picture: picture, // (optional)
        data: data
        // playSound: false, // (optional) default: true
        // soundName: "default", // (optional) Sound to play when the notification is shown.
        // repeatType: "day", // (optional) Repeating interval.
    };

    if (Platform.OS == 'android') {
        notiData.channelId = CONSTANTS.NOTIFICATION_CHANNEL;
        if (subTitle) {
            notiData.subText = subTitle;
        }
    }
    else {
        if (subTitle) {
            notiData.subtitle = subTitle;
        }
    }

    PushNotification.localNotification(notiData);
}
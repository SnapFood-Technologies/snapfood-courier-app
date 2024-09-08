import { Alert } from 'react-native'; 

export default {
    confirmation: (title = 'Confirm', message, confirmText = 'Yes', cancelText = 'No') => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: cancelText,
                        onPress: reject,
                        style: 'cancel',
                    },
                    {
                        text: confirmText,
                        onPress: resolve,
                    },
                ],
                { cancelable: false },
            );
        });
    },
    info: (title = 'Confirm', message) => {
        return new Promise((resolve) => {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: 'Ok',
                        onPress: resolve,
                    },
                ],
                { cancelable: false },
            );
        });
    },
    error: (title = 'Error', message) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Ok',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    },
};

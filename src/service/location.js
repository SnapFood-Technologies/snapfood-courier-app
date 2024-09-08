import RNLocation from 'react-native-location';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { Linking , Platform} from 'react-native'; 
import { Alerts } from '_service';

export const NO_PERMISSION = 'NO_PERMISSION';

export const checkLocationPermission = () => {
    return new Promise((resolve, reject) => {
        RNLocation.checkPermission({
            ios: 'whenInUse',
            android: {
                detail: 'coarse',
            },
        }).then(resolve, reject);
    });
};

export const showAlertSetting = (resolve, reject) => {
    Alerts
        .confirmation('Attention', 'Location is unavailable.', 'Settings', 'Cancel')
        .then(
            () => {
                if (Platform.OS == 'android') {
                    AndroidOpenSettings.locationSourceSettings();
                } else {
                    Linking.openURL('app-settings:');
                }
            },
            (error) => {
                reject(error);
            }
        );
};

export const requestLocationPermission = () => {
    return new Promise((resolve, reject) => {
        RNLocation.requestPermission({
            ios: 'whenInUse',
            android: {
                detail: 'coarse',
            },
        }).then((granted) => {
            resolve(granted);
        });
    });
};

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        RNLocation.getLatestLocation({ timeout: 600000 }).then((location) => {
            if (location) {
                resolve(location);
            } else {
                reject({
                    code: NO_PERMISSION,
                });
            }
        })
            .catch((error) => {
                reject(error);
            });
    });
}; 
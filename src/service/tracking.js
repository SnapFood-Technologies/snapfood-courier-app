import firestore from '@react-native-firebase/firestore';
export const tracking_collection = firestore().collection('trackings')

export const updateLocation = async (user_id, lat, lng) => {
    try {
        await tracking_collection.doc('' + user_id).set({
            id: user_id,
            lat: lat,
            lng: lng,
        });
    }
    catch (error) {
        console.log('tracking updateLocation ', error);
    }
};

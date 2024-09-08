import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  LOCATION_PERM_ANSWERED : 'LOCATION_PERM_ANSWERED',

}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
    return  null;
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

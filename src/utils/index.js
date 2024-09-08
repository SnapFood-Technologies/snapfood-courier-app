/* eslint-disable no-bitwise */
import {CONSTANTS} from '_service';
import Toast from 'react-native-toast-message';
export * from './chat-custom-ui';
export const handleErrorMsg = (err) => {
  let message = CONSTANTS.SOMETHING_WRONG;
  if (err.response) {
    message = err.response.data.message;
  }
  Toast.show({
    type: 'error',
    text1: CONSTANTS.APP_NAME,
    text2: message,
  });
};
export const generateRandom = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

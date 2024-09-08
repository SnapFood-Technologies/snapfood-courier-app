import personalInfoReducer from './slices/personalInfo';
import locationInfoReducer from './slices/locationInfo';
import currentOrderReducer from './slices/currentOrder';
import appInfoReducer from './slices/appInfo';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'currentOrder',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, currentOrderReducer);
export default combineReducers({
  personalInfo: personalInfoReducer,
  locationInfo: locationInfoReducer,
  currentOrder: persistedReducer,
  app : appInfoReducer,
});

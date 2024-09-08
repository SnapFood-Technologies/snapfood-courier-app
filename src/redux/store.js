import {createStore} from 'redux';
import rootReducer from './reducer';
import {persistStore} from 'redux-persist';
import {devToolsEnhancer} from 'redux-devtools-extension';

let store = createStore(rootReducer, devToolsEnhancer());
let persistor = persistStore(store);
export {store, persistor};

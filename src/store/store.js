import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export default store;

export const persistor = persistStore(store)
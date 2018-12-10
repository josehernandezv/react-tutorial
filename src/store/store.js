// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers/rootReducer';

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk)
//     )
// );

// export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    const store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(thunk)
        )
    );
    const persistor = persistStore(store)
    return { store, persistor }
}
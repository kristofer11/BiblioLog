import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import libraryReducer from './features/librarySlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        library: libraryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});

export default store;
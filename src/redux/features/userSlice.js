import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { clearLibrary } from './librarySlice';

export const login = createAsyncThunk('user/login', async ({ email, password }) => {

    const response = await fetch(`https://library-api-1iik.onrender.com/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        console.log('FAILED!')
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
    }

    const data = await response.json();
    const token = data.token;
    const id = data._id;
    localStorage.setItem('token', token);
    console.log(localStorage.token)
    localStorage.setItem('id', id)


    return data;
});

export const logout = createAsyncThunk('user/logout', async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
});

export const register = createAsyncThunk('user/register', async ({ name, email, password }) => {
    const response = await fetch(`https://library-api-1iik.onrender.com/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    const token = data.token;
    const id = data._id;
    localStorage.setItem('token', token);
    localStorage.setItem('id', id)
    return data;

});

const initialState = {
    userName: null,
    id: null,
    isLoggedIn: false,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userName = action.payload.userName;
            state.id = action.payload.id;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        clearUser: (state) => {
            state.user.userName = null;
            state.user.id = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.userName = action.payload.name;
                state.id = action.payload._id;
                state.isLoggedIn = true;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.userName = null;
                state.id = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.userName = null;
                state.id = null;
                state.isLoggedIn = false;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.userName = null;
                state.id = null;
                state.isLoggedIn = false;
                state.isAuthenticated = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.userName = action.payload.name;
                state.id = action.payload._id;
                state.isLoggedIn = true;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.userName = null;
                state.id = null;
                state.isAuthenticated = false;
            })
    },
});

export default userSlice.reducer;

export const {
    setUser,
    clearUser,
    setLoading,
    setError,
    clearError,
    updateUser,
} = userSlice.actions;
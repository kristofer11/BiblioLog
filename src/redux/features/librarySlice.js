import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLibrary = createAsyncThunk('library/getLibrary', async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');

    const response = await fetch(`https://library-api-1iik.onrender.com/api/library/${userId}/books`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log(data, 'yoyo!')
    const books = data.books;
    const id = data._id;

    return data;
})

//add book to library
export const addBook = createAsyncThunk('library/addBook', async ({ title, author, img, rating, review }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');

    const response = await fetch(`https://library-api-1iik.onrender.com/api/library/${userId}/books`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, img, rating, review }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    const books = data.books;
    const id = data._id;

    return data;
})


const initialState = {
    books: [],
    id: null,
    isLoading: false,
    error: null,
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setLibrary: (state, action) => {
            state.books = action.payload.books;
            state.id = action.payload.id;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        clearLibrary: (state, action) => {
            state.books = [];
            state.id = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLibrary.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getLibrary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.books = action.payload;
                state.id = action.payload._id;
                state.isAuthenticated = true;
            })
            .addCase(getLibrary.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.books = null;
                state.id = null;
                state.isAuthenticated = false;
            })
            .addCase(addBook.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.books = action.payload;
                state.id = action.payload._id;
                state.isAuthenticated = true;
            })
            .addCase(addBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.books = null;
                state.id = null;
                state.isAuthenticated = false;
            })
    }
})

export default librarySlice.reducer;

export const { setLibrary, clearLibrary } = librarySlice.actions; 

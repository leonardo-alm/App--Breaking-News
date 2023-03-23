import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const loadAllPreviews = createAsyncThunk(
    'articlePreviews/loadAllPreviews',
    async () => {
        const data = await fetch('api/articles');
        const json = await data.json();
        return json;
    }
);

export const articlePreviewsSlice = createSlice({
    name: 'articlePreviews',
    initialState: {
        articles: [],
        isLoadingArticlePreviews: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadAllPreviews.pending, (state) => {
                state.isLoadingArticlePreviews = true;
                state.hasError = false;
            })
            .addCase(loadAllPreviews.fulfilled, (state, action) => {
                state.isLoadingArticlePreviews = false;
                state.articles = action.payload;
            })
            .addCase(loadAllPreviews.rejected, (state) => {
                state.isLoadingArticlePreviews = false;
                state.hasError = true;
                state.articles = [];
            });
    },
});

export const selectAllPreviews = (state: RootState) => state.articlePreviews.articles;
export const isLoading = (state: RootState) => state.articlePreviews.isLoadingArticlePreviews;

export default articlePreviewsSlice.reducer;

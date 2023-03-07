import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ArticleState } from '../../interfaces/IArticleState';

export const loadCurrentArticle = createAsyncThunk(
    'currentArticle/loadCurrentArticle',
    async (articleId: number) => {
        const data = await fetch(`api/articles/${articleId}`);
        const json = await data.json();
        return json;
    }
);

const initialState: ArticleState = {
    article: undefined,
    isLoadingCurrentArticle: false,
    hasError: false
}

export const currentArticleSlice = createSlice({
    name: 'currentArticle',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCurrentArticle.pending, (state) => {
                state.isLoadingCurrentArticle = true;
                state.hasError = false;
            })
            .addCase(loadCurrentArticle.fulfilled, (state, action) => {
                state.isLoadingCurrentArticle = false;
                state.hasError = false;
                state.article = action.payload;
            })
            .addCase(loadCurrentArticle.rejected, (state) => {
                state.isLoadingCurrentArticle = false;
                state.hasError = true;
                state.article = undefined;
            })
    },
});

export const selectCurrentArticle = (state: RootState) => state.currentArticle.article;
export const isLoadingCurrentArticle = (state: RootState) => state.currentArticle.isLoadingCurrentArticle;

export default currentArticleSlice.reducer;

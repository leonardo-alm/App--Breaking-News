import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ICommentsState } from '../../interfaces/ICommentsState';

export const loadCommentsForArticleId = createAsyncThunk(
    'comments/loadCommentsForArticleId',
    async (articleId: number) => {
        const data = await fetch(`api/articles/${articleId}/comments`)
        const json = await data.json();
        return json;
    }
);

export const postCommentForArticleId = createAsyncThunk(
    'comments/postCommentForArticleId',
    async ({ articleId, comment }: { articleId: number; comment: string }) => {
        const requestBody = JSON.stringify({ comment: comment })
        const response = await fetch(`api/articles/${articleId}/comments`, {
            method: 'POST',
            body: requestBody
        })
        const json = await response.json();
        return json;
    }
);

const initialState: ICommentsState = {
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCommentsForArticleId.pending, (state) => {
                state.isLoadingComments = true;
                state.failedToLoadComments = false;
            })
            .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
                state.isLoadingComments = false;
                state.byArticleId = { [action.payload.articleId]: action.payload.comments }
            })
            .addCase(loadCommentsForArticleId.rejected, (state) => {
                state.isLoadingComments = false;
                state.failedToLoadComments = true;
            })
            .addCase(postCommentForArticleId.pending, (state) => {
                state.createCommentIsPending = true;
                state.failedToCreateComment = false;
            })
            .addCase(postCommentForArticleId.fulfilled, (state, action) => {
                state.createCommentIsPending = false;
                state.failedToCreateComment = false;
                state.byArticleId[action.payload.articleId].push(action.payload)
            })
            .addCase(postCommentForArticleId.rejected, (state) => {
                state.createCommentIsPending = false;
                state.failedToCreateComment = true;
            })
    },
});

export const selectComments = (state: RootState) => state.comments.byArticleId;
export const isLoadingComments = (state: RootState) => state.comments.isLoadingComments;
export const createCommentIsPending = (state: RootState) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;

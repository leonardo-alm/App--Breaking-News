import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
    postCommentForArticleId,
    createCommentIsPending,
} from '../features/comments/commentsSlice';

export default function CommentForm({ articleId }: { articleId: number }) {
    const dispatch = useDispatch<AppDispatch>();
    const [comment, setComment] = useState('');
    const isCreatePending = useSelector(createCommentIsPending)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(postCommentForArticleId({ articleId: articleId, comment: comment }))
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='comment' className='label'>
                Add Comment:
            </label>
            <div id='input-container'>
                <input
                    id='comment'
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                    type='text'
                />
                <button
                    disabled={isCreatePending}
                    className='comment-button'
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadCommentsForArticleId,
    selectComments,
    isLoadingComments,
} from './commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import { AppDispatch } from '../../app/store';

const Comments = () => {
    const dispatch = useDispatch<AppDispatch>();
    const article = useSelector(selectCurrentArticle);
    const comments = useSelector(selectComments);
    const commentsAreLoading = useSelector(isLoadingComments);

    useEffect(() => {
        if (article !== undefined) {
            dispatch(loadCommentsForArticleId(article.id));
        }

    }, [article]);

    const commentsForArticleId = article === undefined ? [] : comments[article.id]

    if (commentsAreLoading) return <div>Loading Comments</div>;
    if (!article) return null;

    return (
        <div className='comments-container'>
            <h3 className='comments-title'>Comments</h3>
            <CommentList comments={commentsForArticleId} />
            <CommentForm articleId={article.id} />
        </div>
    );
};

export default Comments;

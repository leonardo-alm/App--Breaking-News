import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadAllPreviews,
    selectAllPreviews,
    isLoading,
} from './articlePreviewsSlice';
import { loadCurrentArticle } from '../currentArticle/currentArticleSlice';
import ArticleListItem from '../../components/ArticleListItem';
import { IArticle } from '../../interfaces/IArticle';
import { AppDispatch } from '../../app/store';

const ArticlePreviews = () => {
    const dispatch = useDispatch<AppDispatch>();
    const articlePreviews = useSelector(selectAllPreviews);
    const isLoadingPreviews = useSelector(isLoading);

    useEffect(() => {
        dispatch(loadAllPreviews());
    }, [dispatch]);

    if (isLoadingPreviews) {
        return <div>loading state</div>;
    }

    return (
        <>

            <h2 className='section-title'>All Articles</h2>
            <section className='articles-container'>
                {articlePreviews.map((article: IArticle) => (
                    <div className='article-box' key={article.id} onClick={(e) => dispatch(loadCurrentArticle(article.id))}>
                        <ArticleListItem article={article} />
                    </div>
                ))}
            </section>
        </>
    );
};

export default ArticlePreviews;

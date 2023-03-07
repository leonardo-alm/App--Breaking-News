import { IArticle } from "./IArticle";

export interface ArticleState {
    article: undefined | IArticle;
    isLoadingCurrentArticle: boolean;
    hasError: boolean;
}

import { IArticle } from "./IArticle";

export interface IArticleState {
    article: undefined | IArticle;
    isLoadingCurrentArticle: boolean;
    hasError: boolean;
}

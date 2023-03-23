import { IUserComments } from "./IUserComments";

export interface ICommentsState {
    byArticleId: IUserComments;
    isLoadingComments: boolean;
    failedToLoadComments: boolean;
    createCommentIsPending: boolean;
    failedToCreateComment: boolean;
}
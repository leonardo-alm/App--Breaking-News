import { IUserComments } from "./IUserComments";

export interface CommentsState {
    byArticleId: IUserComments;
    isLoadingComments: boolean;
    failedToLoadComments: boolean;
    createCommentIsPending: boolean;
    failedToCreateComment: boolean;
}
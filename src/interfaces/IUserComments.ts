import { IComment } from "./IComment";

export interface IUserComments {
    [articleId: number]: IComment[];
}
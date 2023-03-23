import { ICommentListProps } from '../interfaces/ICommentListProps';
import Comment from './Comment';

export default function CommentList({ comments}: ICommentListProps) {
    if (!comments) {
        return null;
    }

    return (
        <ul className='comments-list'>
            {
                comments.map((comment) => {
                    return <Comment comment={comment} key={comment.id} />
                })
            }
        </ul>
    );
}

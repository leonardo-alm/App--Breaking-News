import { ICommentProps } from '../interfaces/ICommentProps';

export default function Comment({ comment }: ICommentProps) {
    const { id, text } = comment
    return (
        <li key={id} className='comment-container'>
            <span>{text}</span>
        </li>
    );
}

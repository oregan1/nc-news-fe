import { useEffect, useState } from "react";
import requests from "../../utils/requests";
import CommentCard from "./CommentCard";
import './Comments.css';


const Comments = ({article_id, user, comment_count}) => {
    const [comments, setComments] = useState();
    const [loadingComments, setLoadingComments] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);
    const [posted, setPosted] = useState(false);
    const [commentCount, setCommentCount] = useState();
    const [isDeletingComment, setIsDeletingComment] = useState(false);


    const [isError, setIsError] = useState(false);
    const [errorMesage, setErrorMesage] = useState();


    useEffect(() => {
        setLoadingComments(true);
        requests.getComments(article_id)
        .then((data) => {
            setComments(data);
            setCommentCount(comment_count)
            setLoadingComments(false);
        })
        .catch((err) => {
            setIsError(true);
            setErrorMesage(err.message);
        })
    },[article_id, comment_count])

    const handleChange = (event) => {
        setNewComment(event.target.value);
    }

    const postComment = () => {
        setIsPostingComment(true);
        setPosted(false);
        if (!newComment){
            setIsPostingComment(false);
            return;
        }
        requests.addComment(article_id, {"username":user, "body":newComment})
        .then((data) => {
            setComments([data,...comments]);
            setIsPostingComment(false);
            setCommentCount(commentCount + 1);
            setPosted(true);
        })
        .then(() => {
            if(posted){
                setNewComment('');
            }
        })
        .catch((err) => {
            setIsError(true);
            setErrorMesage(err.message);
        })

    }

    const removeComment = (id) => {
        setIsDeletingComment(true);
        requests.deleteComment(id)
        .then((data) => {
            setCommentCount(commentCount - 1);
            setComments(comments.filter((comment) => {
                return comment.comment_id !== id;
            }))
            setIsDeletingComment(false);
        })
    }

    if (loadingComments){
        return <div>
            {isError?<p>{errorMesage}</p>:<p>Loading comments...</p>}
            </div>
    }else{
        return <div>
            {isError?<p>{errorMesage}</p>:<div>
            <textarea name="commentInput" 
                onChange={handleChange} 
                value={newComment}
                className="commentInput"
                placeholder="Post a comment!"></textarea>
            <button onClick={postComment} disabled={isPostingComment} className='postButton'>post</button>
            {posted?<p>Posted!</p>:null}
            {isPostingComment?<p>Posting...</p>:null}
            {isDeletingComment?<p>Deleting...</p>:null}
            <ul>
                {comments.map((comment) => {
                    return <li key={comment.comment_id} className='commentElement'>
                        <CommentCard comment={comment} user={user}/>
                        {comment.author === user?
                            <button 
                            onClick={() => {removeComment(comment.comment_id)}}
                            className='deleteButton'>
                                Delete</button>:null}
                    </li>
                })}
            </ul>
            <p>Comment count: {commentCount}</p>
           </div>}
        </div>
    }
}

export default Comments;
import { useEffect, useState } from "react";
import requests from "../../utils/requests";
import CommentCard from "./CommentCard";


const Comments = ({article_id, user, comment_count}) => {
    const [comments, setComments] = useState();
    const [loadingComments, setLoadingComments] = useState(true);
    const [newComment, setNewComment] = useState();
    const [isPostingComment, setIsPostingComment] = useState(false);
    const [posted, setPosted] = useState(false);
    const [commentCount, setCommentCount] = useState();

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
    },[])

    const handleChange = (event) => {
        setNewComment(event.target.value);
    }

    const postComment = () => {
        setIsPostingComment(true);
        setPosted(false);
        if (!newComment){
            return;
        }
        requests.addComment(article_id, {"username":user, "body":newComment})
        .then((data) => {
            setComments([data,...comments]);
            setIsPostingComment(false);
            setCommentCount(commentCount + 1);
            setPosted(true);
        })
        .catch((err) => {
            setIsError(true);
            setErrorMesage(err.message);
        })
    }

    if (loadingComments){
        return <div>
            {isError?<p>{errorMesage}</p>:<p>Loading comments...</p>}
            </div>
    }else{
        return <div>
            {isError?<p>{errorMesage}</p>:<div>
            <label htmlFor="commentInput">Comment:</label>
            <textarea name="commentInput" onChange={handleChange}></textarea>
            <button onClick={postComment} disabled={isPostingComment}>post</button>
            {posted?<p>Posted!</p>:null}
            {isPostingComment?<p>Posting...</p>:null}
            <ul>
                {comments.map((comment) => {
                    return <li key={comment.comment_id}>
                        <CommentCard comment={comment} />
                    </li>
                })}
            </ul>
            <p>Comment count: {commentCount}</p>
           </div>}
        </div>
    }
}

export default Comments;
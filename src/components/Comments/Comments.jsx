import { useEffect, useState } from "react";
import requests from "../../utils/requests";
import CommentCard from "./CommentCard";


const Comments = ({article_id, user}) => {
    const [comments, setComments] = useState();
    const [loadingComments, setLoadingComments] = useState(true);
    const [newComment, setNewComment] = useState();
    const [isPostingComment, setIsPostingComment] = useState(false);
    const [posted, setPosted] = useState(false);

    useEffect(() => {
        setLoadingComments(true);
        requests.getComments(article_id)
        .then((data) => {
            setComments(data);
            setLoadingComments(false);
        })
        .catch((err) => {
            if(err.code === "ERR_NETWORK"){
                alert('Internet connection is offline..')
            }
        })
    },[])

    const handleChange = (event) => {
        setNewComment(event.target.value);
    }

    const postComment = () => {
        setIsPostingComment(true);
        setPosted(false);
        if (!newComment){
            console.log('no')
            return;
        }
        requests.addComment(article_id, {"username":user, "body":newComment})
        .then((data) => {
            setComments([data,...comments]);
            setIsPostingComment(false);
            setPosted(true);
        })
        .catch((err) => {
            if(err.code === "ERR_NETWORK"){
                alert('Internet connection is offline..')
            }
        })
    }

    if (loadingComments){
        return <p>Loading comments...</p>
    }else{
        return <div>
            <label htmlFor="commentInput">Comment:</label>
            <input type="text" id="commentInput" onChange={handleChange}></input>
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
        </div>
    }
}

export default Comments;
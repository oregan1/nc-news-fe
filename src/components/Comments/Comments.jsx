import { useEffect, useState } from "react";
import requests from "../../utils/requests";
import CommentCard from "./CommentCard";


const Comments = ({article_id}) => {
    const [comments, setComments] = useState();
    const [loadingComments, setLoadingComments] = useState(true);

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

    if (loadingComments){
        return <p>Loading comments...</p>
    }else{
        return <div>
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
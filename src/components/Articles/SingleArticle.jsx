import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requests from "../../utils/requests";


const SingleArticle = () => {
    const {article_id} = useParams();
    const [curArticle, setCurArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [votes, setVotes] = useState();
    const [voted, setVoted] = useState(false);
    const [comments, setComments] = useState();
    const [loadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        requests.getArticle(article_id)
        .then((data) => {
            setCurArticle(data);
            setVotes(data.votes);
            setIsLoading(false);
        })
    },[])

    const vote = () => {
        let amount = 0
        if (!voted){
            document.getElementById('voteButton').innerHTML="unvote"
            amount = 1;
            setVoted(true);
        }else{
            document.getElementById('voteButton').innerHTML="vote"
            amount = -1;
            setVoted(false);
        }
        requests.addVotes(curArticle.article_id, {"inc_votes": amount})
        .then((data) => {
            setVotes(data.votes);
        })
        .catch((err) => {
            console.log(err); //alert?
        })
    }

    const getComments = () => {
        setLoadingComments(true);
        requests.getComments(curArticle.article_id)
        .then((data) => {
            setComments(data);
            setLoadingComments(false);
        })
    }

    if (isLoading) {
        return <p>Loading article...</p>
    }else{
        getComments();
        return <div>
        <h3>{curArticle.title}</h3>
        <p>Author: {curArticle.author}</p>
        <p>{curArticle.body}</p>
        <p>Created at: {curArticle.created_at}</p>
        <p>Votes: {votes}</p>
        <button onClick={() => vote()} id="voteButton">Vote</button>
        <p>Comment count: {curArticle.comment_count}</p>
        <h4>Comments:</h4>
        {loadingComments?<p>Loading comments..</p>:
                <ul>
                {comments.map((comment) => {
                    return <li>
                        {comment.body}
                    </li>
                })}
            </ul>
        }

    </div>
    }
    
}

export default SingleArticle;
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requests from "../../utils/requests";
import Comments from "../Comments/Comments";


const SingleArticle = () => {
    const {article_id} = useParams();
    const [curArticle, setCurArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [votes, setVotes] = useState();
    const [voted, setVoted] = useState(false);
    const [voteText, setVoteText] = useState('vote');

    useEffect(() => {
        setIsLoading(true);
        requests.getArticle(article_id)
        .then((data) => {
            setCurArticle(data);
            setVotes(data.votes);
            setIsLoading(false);
        })
        .catch((err) => {
            if(err.code === "ERR_NETWORK"){
                alert('Internet connection is offline..')
            }
        })
    },[])

    const vote = () => {
        let amount = 0
        if (!voted){
            setVoteText('unvote');
            amount = 1;
            setVoted(true);
        }else{
            setVoteText('vote');
            amount = -1;
            setVoted(false);
        }
        requests.addVotes(curArticle.article_id, {"inc_votes": amount})
        .then((data) => {
            setVotes(data.votes);
        })
        .catch((err) => {
            if(err.code === "ERR_NETWORK"){
                alert('Internet connection is offline..')
            }
        })
    }



    

    if (isLoading) {
        return <p>Loading article...</p>
    }else{
        return <div>
        <h3>{curArticle.title}</h3>
        <p>Author: {curArticle.author}</p>
        <p>{curArticle.body}</p>
        <p>Created at: {curArticle.created_at}</p>
        <p>Votes: {votes}</p>
        <button onClick={() => vote()} id="voteButton">{voteText}</button>
        <h4>Comments:</h4>
        <Comments article_id={article_id}/>
        <p>Comment count: {curArticle.comment_count}</p>

    </div>
    }
    
}

export default SingleArticle;
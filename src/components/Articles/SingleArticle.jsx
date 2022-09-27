import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requests from "../../utils/requests";
import Comments from "../Comments/Comments";


const SingleArticle = ({user}) => {
    const {article_id} = useParams();
    const [curArticle, setCurArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [votes, setVotes] = useState();
    const [voted, setVoted] = useState(false);
    const [voteText, setVoteText] = useState('vote');
    const [commentCount, setCommentCount] = useState();

    const [isError, setIsError] = useState(false);
    const [errorMesage, setErrorMesage] = useState();


    useEffect(() => {
        setIsLoading(true);
        requests.getArticle(article_id)
        .then((data) => {
            setCurArticle(data);
            setVotes(data.votes);
            setCommentCount(data.comment_count);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true);
            setErrorMesage(err.message);
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
            setIsError(true);
            setErrorMesage(err.message);
        })
    }



    

    if (isLoading) {
        return <div>
        {isError?<p>{errorMesage}</p>:<p>Loading articles...</p>}
        </div>
    }else{
        return <div>
        {isError?<p>{errorMesage}</p>:<div>
        <h3>{curArticle.title}</h3>
        <p>Author: {curArticle.author}</p>
        <p>{curArticle.body}</p>
        <p>Created at: {curArticle.created_at}</p>
        <p>Votes: {votes}</p>
        <button onClick={() => vote()} id="voteButton">{voteText}</button>
        <h4>Comments:</h4>
        <Comments article_id={article_id} user={user} comment_count={commentCount}/>
        </div>}
    </div>
    }
    
}

export default SingleArticle;
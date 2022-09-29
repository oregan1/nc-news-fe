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
            if(err.code === 'ERR_BAD_REQUEST'){
                setErrorMesage('No artilce with that ID')
            }else{
                setErrorMesage(err.message);
            }
        })
    },[article_id])


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
        <div className="singleArticle">
            <h3 className="articleTitle">{curArticle.title}</h3>
            <p><span className="singleArticleAttribute">Author: </span>{curArticle.author}</p>
            <p className="articleBody">{curArticle.body}</p>
            <p><span className="singleArticleAttribute">Created at: </span>{curArticle.created_at.slice(0,10)}</p>
            <p><span className="singleArticleAttribute">Votes: </span>{votes}</p>
            <button onClick={() => vote()} id="voteButton" className="voteButton">{voteText}</button>
        </div>
        <hr className="divider"/>
        <h4 className="commentsTitle">Comments:</h4>
        <Comments article_id={article_id} user={user} comment_count={commentCount}/>
        </div>}
    </div>
    }
    
}

export default SingleArticle;
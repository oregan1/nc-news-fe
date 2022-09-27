import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requests from "../../utils/requests";


const SingleArticle = () => {
    const {article_id} = useParams();
    const [curArticle, setCurArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        requests.getArticle(article_id)
        .then((data) => {
            setCurArticle(data);
            setIsLoading(false);
        })
    },[])

    if (isLoading) {
        return <p>Loading article...</p>
    }else{
        return <div>
        <h3>{curArticle.title}</h3>
        <p>Author: {curArticle.author}</p>
        <p>{curArticle.body}</p>
        <p>Created at: {curArticle.created_at}</p>
        <p>Votes: {curArticle.votes}</p>
        <p>Comments: {curArticle.comment_count}</p>
    </div>
    }

}

export default SingleArticle;
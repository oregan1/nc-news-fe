import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requests from "../../utils/requests";


const SingleArticle = () => {
    const {article_id} = useParams();
    const [curArticle, setCurArticle] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        requests.getArticle(article_id)
        .then((data) => {
            setCurArticle(data);
            setIsLoading(false);
        })
    })

    if (isLoading) {
        return <p>Loading article...</p>
    }else{
        return <div>
        {curArticle.title}
    </div>
    }

}

export default SingleArticle;
import axios from 'axios';
import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import requests from '../../utils/requests';

import './Articles.css';

const Articles = () => {
    const {topic} = useParams();
    const [articles, setArticles] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        requests.getArticles()
        .then((res) => {
            if (topic !== 'allArticles'){
                setArticles(res.filter((article) => {
                    return article.topic == topic;
                }))
            }else{
                setArticles(res);
            }
            setIsLoading(false);
        })
    },[topic]);


    if(isLoading){
        return <p>Loading articles...</p>
    }else{
        return <div>
            <ul>
                {articles.map((article) => {
                    return <li key={article.article_id}>
                        <ArticleCard article={article}/>
                    </li>
                })}
            </ul>
        </div>
    }

}

export default Articles;
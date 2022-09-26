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
    const [articlesByTopic, setArticlesByTopic] = useState();
    const [gettingBaseArticles, setGettingBaseArticles] = useState(true);;

    useEffect(() => {
        setIsLoading(true);
        setGettingBaseArticles(true);
        requests.getArticles()
        .then((res) => {
            setArticles(res);
            setArticlesByTopic(res);
            setGettingBaseArticles(false);
        })
        .then(() => {
            if(!gettingBaseArticles){
                filterArticlesByTopic();
            }
            setIsLoading(false);
        })
    },[topic]);

    const filterArticlesByTopic = () => {
        if (topic !== 'allArticles'){
            setArticlesByTopic(articles.filter((article) => {
                return article.topic == topic;
            }))
        }
    }
    

    if(isLoading){
        return <p>Loading articles...</p>
    }else{
        return <div>
            <ul>
                {articlesByTopic.map((article) => {
                    return <li key={article.article_id}>
                        <ArticleCard article={article}/>
                    </li>
                })}
            </ul>
        </div>
    }

}

export default Articles;
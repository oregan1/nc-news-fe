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
        requests.getArticles(topic)
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
    },[topic]);


    if(isLoading){
        return <p>Loading articles...</p>
    }else{
        return <div>
            <ul className='articleList'>
                {articles.map((article) => {
                    return <li key={article.article_id} className='articleListElement'>
                        <ArticleCard article={article}/>
                    </li>
                })}
            </ul>
        </div>
    }

}

export default Articles;
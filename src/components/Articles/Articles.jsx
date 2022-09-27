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
    const [order, setOrder] = useState('desc')
    const [sort_by, setSortBy] = useState('created_at')


    useEffect(() => {
    setIsLoading(true);
        requests.getArticles(topic, sort_by, order)
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
    },[topic, order, sort_by]);

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    }


    if(isLoading){
        return <p>Loading articles...</p>
    }else{
        return <div>
            <select name="order" onChange={handleOrderChange}>
                <option value="" selected disabled hidden>Change order</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>

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
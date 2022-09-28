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
    const [order, setOrder] = useState()
    const [sort_by, setSortBy] = useState()


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
        setIsLoading(true);
        if(order == event.target.value){
            requests.getArticles(topic, sort_by, order)
            .then((data) => {
                setArticles(data)
                setIsLoading(false)
            })
        }
    }

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setIsLoading(true);
        if (sort_by == event.target.value){
            requests.getArticles(topic, sort_by, order)
            .then((data) => {
                setArticles(data)
                setIsLoading(false)
            })
        }
    }


    if(isLoading){
        return <p>Loading articles...</p>
    }else{
        return <div>
            <select name="order" onChange={handleOrderChange}>
                <option value="" hidden>Order: {order}</option>
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
            </select>

            <select name="SORT_BY" onChange={handleSortChange}>
                <option value="" hidden>Sort by: {sort_by}</option>
                <option value="created_at">Created at</option>
                {/* <option value="comment_count">comment_count</option> */}
                <option value="votes">Votes</option>
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
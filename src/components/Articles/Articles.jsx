import axios from 'axios';
import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import './Articles.css';

const Articles = () => {
    const [articles, setArticles] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://tomnews.herokuapp.com/api/articles')
        .then(({data}) => {
            setArticles(data.articles);
            setIsLoading(false)
        })
    },[]);

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
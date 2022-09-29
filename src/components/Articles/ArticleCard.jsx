import { Link } from "react-router-dom";
import './Articles.css';

const ArticleCard = ({article}) => {
    return <div className="articleCard">
        <h4 className="articleTitle">{article.title}</h4>
        <hr className="titleDivisor" />
        <p><span className="articleAttribute">Author: </span>{article.author}</p>
        <p><span className="articleAttribute">Topic: </span>{article.topic}</p>
        <p><span className="articleAttribute">Comment count: </span>{article.comment_count}</p>
        <p><span className="articleAttribute">Votes: </span>{article.votes}</p>
        <p><span className="articleAttribute">Created: </span>{article.created_at.slice(0,10)}</p>
        <Link to={`/articles/${article.article_id}`}>More</Link>
    </div>
}

export default ArticleCard;
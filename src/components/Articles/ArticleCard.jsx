const ArticleCard = ({article}) => {
    return <div>
        <h4>{article.title}</h4>
        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>Comment count: {article.comment_count}</p>
    </div>
}

export default ArticleCard;
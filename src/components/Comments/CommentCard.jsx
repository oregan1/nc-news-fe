
const CommentCard = ({comment,user}) => {
    return <div>
        <h5>{comment.author}:</h5>
        <p>{comment.body}</p>
    </div>
}

export default CommentCard
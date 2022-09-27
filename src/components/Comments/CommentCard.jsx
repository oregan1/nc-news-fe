
const CommentCard = ({comment}) => {
    return <div>
        <h5>{comment.author}:</h5>
        {comment.body}
    </div>
}

export default CommentCard
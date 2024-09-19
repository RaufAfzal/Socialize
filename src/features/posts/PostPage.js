import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButton from "./ReactionButton"
import { useParams } from "react-router-dom"
import { selectPost } from "./PostSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const PostPage = () => {

    const { id } = useParams()

    const post = useSelector((state) => selectPost(state, Number(id)))

    if (!post) {
        return (
            <article>
                <h2> There is no post to display here</h2>
            </article>
        )
    }


    return (
        <>
            <article>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p className="postCredit">
                    <Link to={`/posts/edit/${post.id}`}> Edit Post </Link>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timeStamp={post.date} />
                </p>
                <ReactionButton post={post} />

            </article>
        </>
    )
}

export default PostPage

import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButton from "./ReactionButton"
import { Link } from "react-router-dom"

const PostExcerpt = ({ post }) => {
  const bodyText = post.body ? String(post.body) : '';
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{bodyText}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButton post={post} />
      <Link to = {`/posts/edit/${post.id}`}>Edit this post</Link>

    </article>
  )
}

export default PostExcerpt;

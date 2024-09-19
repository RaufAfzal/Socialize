import {useSelector , useDispatch} from "react-redux"
import { useEffect } from "react"
import { selectAllPosts, getPostsStatus, getPostsError } from "./PostSlice"
import { fetchPosts } from "./PostSlice"
import PostExcerpt from "./postExcerpt"

const PostList = () => {

    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostsStatus)
    const postError = useSelector(getPostsError)

    const dispatch = useDispatch();

    useEffect(() => {
      if(postStatus === 'idle') {
        dispatch(fetchPosts())
      }
    },[postStatus, dispatch])


    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(( post,index)  => { return <PostExcerpt key={index} post={post} />})
    } else if (postStatus === 'failed') {
        content = <p>{postError}</p>;
    }
 
  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostList

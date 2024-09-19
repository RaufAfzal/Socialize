import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { selectPost } from "./PostSlice"
import { selectAllUsers } from "../users/UsersSlice"
import { useParams } from "react-router-dom"
import { updatePost } from "./PostSlice"
import { useNavigate } from "react-router-dom"
import { deletedPost } from "./PostSlice"

const EditPost = () => {

    const {id} = useParams()

    console.log(id)

    const post = useSelector((state) =>  selectPost(state, Number(id)))
    console.log(`Post are ${post?.title}`)

    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch()

    const navigate = useNavigate()



    const [title , setTitle] = useState(post?.title)
    const [userId, setuserId] = useState(post?.userId)
    const [content, setContent] = useState(post?.body)
    // const [request, setRequest] = useState('idle')

    // console.log(`The title of this post is ${title}`)


    const onTitleChanged = (e) => setTitle(e.target.value) 
    const onAuthorChanged = (e) => setuserId(Number(e.target.value))
    const onContentChanged = (e) => setContent(e.target.value)


    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>

    ))

    const canSubmit = [title, userId, content].every(Boolean) 

    const onPostEdit = () => {
        if (canSubmit) {
            try {
            // setRequest('pending')
            dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

            setTitle('')
            setContent('')
            setuserId('')
            navigate("/")
            }
            catch (err) {
                console.log("Error are",err)
            }
            finally {
              //  setRequest('idle')
            }
        }
       
    }

    const onDeletePost = () => {
      if(canSubmit) {
        try{
          dispatch(deletedPost({id: post.id})).unwrap()
          setTitle('')
          setContent('')
          setuserId('')
          navigate("/")

        }
        catch (err) {
          console.log('Error is', err)
        }
      }
    }





  return (
    <section>
      <h2>Edit the Post</h2>
      <form>
      <label htmlFor="post-title"> Add a Post </label>

        <input
        type="text"
        id="post-title"
        placeholder="Please add a post"
        value={title}
        onChange={onTitleChanged}
        ></input>

        <label htmlFor="postAuthor">Author</label>
            <select id= "postAuthor" value = {userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {userOptions}
            </select>

        <label htmlFor="post-content"> Add some Content </label>    

        <input
             type="text"
             id="post-content"
             placeholder="Please add some content"
             value={content}
             onChange={onContentChanged}
             >

        </input>

        <button type="button" onClick = {onPostEdit} disabled={!canSubmit}>Submit</button>
        <button type="button" className="deleteButton" onClick = {onDeletePost} disabled={!canSubmit}>Delete</button>
      </form>
    </section>
  )
}

export default EditPost

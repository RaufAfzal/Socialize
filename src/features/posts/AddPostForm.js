import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./PostSlice";
import { selectAllUsers } from "../users/UsersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const [title , setTitle] = useState('')
    const [content , setContent] = useState('')
    const [userId, setuserId] = useState('')
    const [request, setRequest] = useState('idle')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector(selectAllUsers);

    const onTitleChanged = (e) => {
        setTitle(e.target.value)
    }

    const onContentChanged = (e) => {
        setContent(e.target.value)
    }
    const onAuthorChanged = (e) => {
        setuserId(e.target.value)
    }

    const canSave = [title,content,userId].every(Boolean) && request === 'idle'

    const onPostAdded = () => {
        if (canSave) {
            try {
            setRequest('pending')
            dispatch(addNewPost({title, body: content, userId}))

            setTitle('')
            setContent('')
            setuserId('')
            navigate('/')
            }
            catch (err) {
                console.log("Error are",err)
            }
            finally {
               setRequest('idle')
            }
        }
       
    }

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>

    ))


  return (
    <section>
        <h2>Add a new Post</h2>
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

            <button type="button" onClick = {onPostAdded} disabled={!canSave}>Submit</button>
        </form>
    </section>
  )
}

export default AddPostForm

import { selectAllUsers } from "../users/UsersSlice"
import { useSelector } from "react-redux"

const PostAuthor = ({userId}) => {

    const users = useSelector(selectAllUsers)

    const author = users.find((user) => { return user.id === userId})

  return  <span> by {author ? author.name : "unknown" }</span>
  
}

export default PostAuthor

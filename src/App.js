import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";
import PostPage from "./features/posts/PostPage";
import EditPost from "./features/posts/EditPost";
import { Routes, Route  } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
     <Route path="/" element={<Layout/>}>
        <Route index element={<PostList/>}/>

        <Route path="posts">
          <Route index element={<PostList/>}/>
          <Route path="newpost" element={<AddPostForm/>}/>
          <Route path=":id" element={<PostPage/>}/>
          <Route path="edit/:id" element={<EditPost/>}/>
        </Route>
  

       
      </Route>
    </Routes>
  );
}

export default App;

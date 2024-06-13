import { useNavigate, useParams } from "react-router-dom";
import useBlogPosts from "../hooks/useBlogPosts";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewPostPage() {
  const { posts, isLoading, isError } = useBlogPosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({});
  const fetchPostData = async () => {
    const result = await axios.get(`http://localhost:4000/posts/${params.id}`);
    setPost(result.data.data);
  };

  useEffect(() => {
    fetchPostData();
  }, [params.id]);

  return (
    <div>
      <h1>View Post Page</h1>
      <div className="view-post-container">
        <h2>Post Title: {post.title}</h2>
        <p>Content: {post.content}</p>
      </div>

      <hr />
      <div className="show-all-posts-container">
        <h2>All Posts</h2>
        {posts.map((post) => {
          return (
            <div key={post.id} className="post">
              <h1>{post.title}</h1>
              <div className="post-actions">
                <button
                  className="view-button"
                  onClick={() => navigate(`/post/view/${post.id}`)}
                >
                  View post
                </button>
              </div>
            </div>
          );
        })}
        {isError ? <h1>Request failed</h1> : null}
        {isLoading ? <h1>Loading ....</h1> : null}
      </div>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewPostPage;

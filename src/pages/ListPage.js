import React, { useState, useEffect } from "react";
import axios from "axios";

const ListPage = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map((post) => {
        return <div key={post.id}>{post.title}</div>;
      })}
    </div>
  );
};

export default ListPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

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
        return (
          <Card key={post.id} title={post.title}>
            <div className="d-flex justify-content-between">
              <button>button</button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ListPage;

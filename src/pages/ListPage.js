import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "../components/Card";

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []); // 한 번만 실행토록 빈 배열 걸어줌.

  function deleteBlog(e, id) {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            게시물 생성
          </Link>
        </div>
      </div>
      {posts.length > 0
        ? posts.map((post) => {
            return (
              <Card
                key={post.id}
                title={post.title}
                onClick={() => history.push("/blogs/edit")}
              >
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => deleteBlog(e, post.id)}
                  >
                    삭제
                  </button>
                </div>
              </Card>
            );
          })
        : "게시물이 없습니다."}
    </div>
  );
};

export default ListPage;

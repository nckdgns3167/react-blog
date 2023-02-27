import axios from "axios";
import { bool } from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, []); // 한 번만 실행토록 빈 배열 걸어줌.

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

  if (loading) return <LoadingSpinner />;

  if (posts.length === 0) return "게시물이 없습니다.";

  return posts
    .filter((post) => {
      return isAdmin || post.publish;
    })
    .map((post) => (
      <Card
        key={post.id}
        title={post.title}
        onClick={() => history.push(`/blogs/${post.id}`)}
      >
        {isAdmin ? (
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              삭제
            </button>
          </div>
        ) : null}
      </Card>
    ));
};

BlogList.propTypes = {
  isAdmin: bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;

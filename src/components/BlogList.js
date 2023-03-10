import axios from "axios";
import propTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get("_page");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState("");

  const _limit = 5;

  const onClickPageButton = (_page) => {
    history.push(`${location.pathname}?_page=${_page}`);
    setCurrentPage(_page);
    getPosts(_page);
  };

  const getPosts = useCallback(
    (_page = 1, _sort = "id", _order = "desc") => {
      let params = {
        _page,
        _limit,
        _sort,
        _order,
        title_like: searchText,
      };

      if (!isAdmin) params = { ...params, publish: true };

      axios.get("http://localhost:3001/posts", { params }).then((response) => {
        setNumberOfPosts(Number(response.headers["x-total-count"]));
        setPosts(response.data);
        setLoading(false);
      });
    },
    [isAdmin, searchText]
  );

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / _limit));
  }, [numberOfPosts]);

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

  if (loading) return <LoadingSpinner />;

  const renderBlogList = () => {
    return (
      posts
        // .filter((post) => {
        //   return isAdmin || post.publish;
        // })
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
                  ??????
                </button>
              </div>
            ) : null}
          </Card>
        ))
    );
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`${location.pathname}?_page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  };

  return (
    <div>
      <input
        className="form-control"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
      />
      <hr />
      {posts.length === 0 ? (
        "???????????? ????????????."
      ) : (
        <>
          {renderBlogList()}
          {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              onClick={onClickPageButton}
            />
          )}
        </>
      )}
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;

import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const BlogForm = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/posts", {
        title,
        body,
      })
      .then(() => {
        history.push("/blogs");
      });
  };

  return (
    <div>
      <h1>Create a blog post</h1>
      <div className="mb-2">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          rows="10"
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Post
      </button>
    </div>
  );
};

export default BlogForm;

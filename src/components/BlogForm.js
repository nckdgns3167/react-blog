import axios from "axios";
import { bool } from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const BlogForm = ({ editing }) => {
  const history = useHistory();
  const { id } = useParams();
  const [originTitle, setOriginTitle] = useState("");
  const [originBody, setOriginBody] = useState("");
  const [originPublish, setOriginPublish] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setOriginTitle(res.data.title);
        setOriginBody(res.data.body);
        setOriginPublish(res.data.publish);

        setTitle(res.data.title);
        setBody(res.data.body);
        setPublish(res.data.publish);
      });
    }
  }, [id, editing]);

  const isEdited = () => {
    return (
      title !== originTitle || body !== originBody || publish !== originPublish
    );
  };

  const onSubmit = () => {
    if (editing) {
      axios
        .patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
          publish,
        })
        .then((res) => {
          // setOriginTitle(res.data.title);
          // setOriginBody(res.data.body);
          history.push(`/blogs/${id}`);
        });
    } else {
      axios
        .post("http://localhost:3001/posts", {
          title,
          body,
          publish,
          createAt: Date.now(),
        })
        .then(() => {
          history.push("/admin");
        });
    }
  };

  const goBack = () => {
    if (editing) {
      history.push(`/blogs/${id}`);
    } else {
      history.push(`/blogs/`);
    }
  };

  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  };

  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
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
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={publish}
          onChange={onChangePublish}
        />
        <label className="form-check-label">Publish</label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button className="btn btn-danger ms-2" onClick={goBack}>
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: bool,
};

BlogForm.default = {
  editing: false,
};

export default BlogForm;

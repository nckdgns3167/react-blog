import React from "react";
import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";

const AdminPage = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Admin</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            게시물 생성
          </Link>
        </div>
      </div>
      <BlogList isAdmin={true} />
    </div>
  );
};

export default AdminPage;

import PropTypes from "prop-types";
import React from "react";

const Card = ({ title, onClick, children }) => {
  return (
    <div className="card mb-3 cursor-pointer" onClick={onClick}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

// props의 기본값 설정
Card.defaultProps = {
  //   title: "Title",
  children: null,
  onClick: () => {},
};

export default Card;

import PropTypes from "prop-types";
import React from "react";

const Card = ({ title, onClick, children }) => {
  return (
    <div className="card mb-3 cursor-pointer" onClick={onClick}>
      <div className="card-body py-2 d-flex align-items-center">
        <div className="flex-grow-1">{title}</div>
        {/* children 유무에 따라 컴포넌트 표시할지 말지 */}
        {children && <div>{children}</div>}
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

import React from "react";
import { Link } from "react-router-dom";

const ThumbNail = ({ id, image, name, type }) => {
  const style = type + " thumb-container";
  return (
    <Link to={`/${id}`} className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <small>Type: {type}</small>
      </div>
    </Link>
  );
};

export default ThumbNail;

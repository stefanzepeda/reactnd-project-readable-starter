import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function NavLink (props) {
  const { sort, category, name } = props;
  return(
    <Link to={`/view/${sort}/${category}`}>{name}</Link>
  )
}

export default NavLink;

import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const NavLink = ({ sort, category, name }) =>
(
    <Link to={`/view/${sort}/${category}`}>{name}</Link>
)
export default NavLink;

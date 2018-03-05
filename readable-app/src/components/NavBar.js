import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { Route, Switch } from "react-router-dom";

const NavBar  = () => 
(
    <ul className="HorizontalMenu menu show-for-medium Header__sort">
      <li>
        <Switch>
          <Route
            path="/view/:sort?/:filter?"
            render={({ match }) => (
              <NavLink
                name="All"
                sort="Trending"
                category="All"
              />
            )}
          />
          <Route
            path="*"
            render={({ match }) => (
              <NavLink
                name="All"
                sort="Trending"
                category="All"
              />
            )}
          />
        </Switch>
      </li>
      <li>
        <Switch>
          <Route
            path="/view/:sort?/:filter?"
            render={({ match }) => (
              <NavLink
                name="Trending"
                sort="Trending"
                category={match.params.filter || "All"}
              />
            )}
          />
          <Route
            path="*"
            exact
            render={({ match }) => (
              <NavLink
                name="Trending"
                sort="Trending"
                category="All"
              />
            )}
          />
        </Switch>
      </li>
      <li>
        <Switch>
          <Route
            path="/view/:sort?/:filter?"
            render={({ match }) => (
              <NavLink
                name="New"
                sort="New"
                category={match.params.filter || "All"}
              />
            )}
          />
          <Route
            path="*"
            exact
            render={({ match }) => (
              <NavLink name="New" sort="New" category="All" />
            )}
          />
        </Switch>
      </li>
    </ul>
  )


export default NavBar;

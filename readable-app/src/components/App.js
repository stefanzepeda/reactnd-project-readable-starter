import React, { Component } from "react";
import "./App.css";
import TagList from "./TagList";
import ArticleList from "./ArticleList";
import NewPost from "./NewPost";
import NavBar from "./NavBar";
import Post from "./Post";
import { Route, Switch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

const App = () => (
  <div className="App theme-light">
    <header className="header">
      <div className="Header__top header">
        <div className="expanded row">
          <div className="columns">
            <ul className="menu">
              <li className="Header__logo">
                <img className="logo" src="/readable-logo.jpeg" />
              </li>
              <li>
                <NavLink name="Grumpy Reads" sort="Trending" category="All" />
              </li>
              <NavBar />
            </ul>
          </div>
          <div className="columns shrink">
            <ul className="menu sub-menu">
              <li>
                <Link to="/new/post">
                  <Button>Post</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <div className="App__content">
      <div className="row">
        <Route
          path="/"
          exact
          render={({ match }) => <ArticleList sort="Trending" category="All" />}
        />
        <Route
          path="/"
          exact
          render={({ match }) => <TagList sort="Trending" />}
        />

        <Route
          path="/view/:sort?/:filter?"
          render={({ match }) => (
            <ArticleList
              sort={match.params.sort || "Trending"}
              category={match.params.filter || "All"}
            />
          )}
        />
        <Route
          path="/view/:sort?/:filter?"
          render={({ match }) => (
            <TagList sort={match.params.sort || "Trending"} />
          )}
        />

        <Route
          exact
          path="/post/:category?/:id?"
          render={({ match }) => <Post id={match.params.id || "All"} />}
        />
        <Route
          exact
          path="/post/:category?/:id?/edit"
          render={({ match }) => <Post id={match.params.id || "All"} edit />}
        />
        <Route
          exact
          path="/post/:category?/:id?/delete"
          render={({ match }) => <Post id={match.params.id || "All"} delete />}
        />
      </div>
      <Route exact path="/new/post" render={() => <NewPost />} />
    </div>
  </div>
);

export default App;

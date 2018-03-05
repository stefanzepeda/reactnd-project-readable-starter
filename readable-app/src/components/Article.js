import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { votePost } from "../actions";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

const Article = ({ votePost, postArr }) => {
  const handleVote = (id, direction) => {
    votePost(id, { option: `${direction}Vote` }, direction);
  };
  const post = postArr[0];
  return (
    <li>
      <div className="articles__summary">
        <div className="articles__summary-header">
          <div className="user">
            <span className="user__name">{post.author}</span>
            <span className="articles__tag-link">
              &nbsp;in&nbsp;<Link to={`/view/${post.category}`}>
                {post.category}
              </Link>&nbsp;•&nbsp;
            </span>
            <span className="timestamp__time">
              <Moment fromNow>{post.timestamp}</Moment>
            </span>
          </div>
        </div>
        <div className="articles__content articles__content-block articles__content-block--text">
          <h2 className="articles__h2">
            <Link to={`/post/${post.category}/${post.id}`}>{post.title}</Link>
          </h2>
          <div>
            <Link to={`/post/${post.category}/${post.id}`}>
              {post.body && post.body.substring(0, 200) + "..."}
            </Link>
          </div>
          <div>
            <span className="VotesAndComments">
              <span>
                <i className="comment icon" />
                <span> {post.commentCount}</span>
              </span>
              <button
                onClick={event => {
                  handleVote(post.id, "up");
                }}
                className="ui icon button likeButton"
              >
                <i className="thumbs  up icon" />
              </button>
              <button
                onClick={event => {
                  handleVote(post.id, "down");
                }}
                className="ui icon button likeButton"
              >
                <i className="thumbs  down icon" />
              </button>
              <span className="voteCount">{post.voteScore}</span>

              <Link to={`/post/${post.category}/${post.id}/edit`}>
                &nbsp;&nbsp;[Edit]
              </Link>

              <Link to={`/post/${post.category}/${post.id}/delete`}>
                <button className="ui icon button likeButton">
                  <i className="trash icon" />
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state, ownProps) => ({
  postArr: state.posts.filter((postint, ci) => {
    if (postint.id === ownProps.post.id) return postint;
  })
});

const mapDispatchToProps = dispatch => ({
  votePost: (id, body, direction) => dispatch(votePost(id, body, direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

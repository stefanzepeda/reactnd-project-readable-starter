import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { votePost } from "../actions";
import { connect } from "react-redux";

class Article extends Component {
  handleVote = (id, direction) => {
    this.props.votePost(id, { option: `${direction}Vote` }, direction);
  };
  render() {
    const { postArr } = this.props;
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
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <div>
              <Link to={`/post/${post.id}`}>
                {post.body && post.body.substring(0, 200) + "..."}
              </Link>
            </div>
            <div>
              <span className="VotesAndComments">
                <a>
                  <span className="Icon chatboxes">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path d="M294.1,365.5c-2.6-1.8-7.2-4.5-17.5-4.5H160.5c-34.7,0-64.5-26.1-64.5-59.2V201h-1.8C67.9,201,48,221.5,48,246.5v128.9 c0,25,21.4,40.6,47.7,40.6H112v48l53.1-45c1.9-1.4,5.3-3,13.2-3h89.8c23,0,47.4-11.4,51.9-32L294.1,365.5z" />
                        <path d="M401,48H183.7C149,48,128,74.8,128,107.8v69.7V276c0,33.1,28,60,62.7,60h101.1c10.4,0,15,2.3,17.5,4.2L384,400v-64h17 c34.8,0,63-26.9,63-59.9V107.8C464,74.8,435.8,48,401,48z" />
                      </g>
                    </svg>
                  </span>
                  <span> {post.commentCount}</span>
                </a>
                <button
                  onClick={event => {
                    this.handleVote(post.id, "up");
                  }}
                  className="ui icon button likeButton"
                >
                  <i className="thumbs  up icon" />
                </button>
                <button
                  onClick={event => {
                    this.handleVote(post.id, "down");
                  }}
                  className="ui icon button likeButton"
                >
                  <i className="thumbs  down icon" />
                </button>
                <span className="voteCount">{post.voteScore}</span>
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  postArr: state.metadata.posts.filter((postint, ci) => {
    if (postint.id === ownProps.post.id) return postint;
  })
});

const mapDispatchToProps = dispatch => ({
  votePost: (id, body, direction) => dispatch(votePost(id, body, direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

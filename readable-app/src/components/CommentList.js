import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostComments } from "../actions";
import Comment from "./Comment";
import { Dropdown } from "semantic-ui-react";

class CommentList extends Component {


  constructor() {
    super();
    this.state = {
      sortOptions: [
        { text: "votes", value: "votes" },
        { text: "age", value: "age" }
      ],
      sortFunc: sortByDate
    };
  }

  componentWillMount() {
    this.props.fetchComments(this.props.post);
  }

  handleChange = (e, data) => {
    this.setState(prevState => {
      return {
        ...prevState,
        sortFunc: data.value === "age" ? sortByDate : sortByScore
      };
    });
  };

  render() {
    const { metadata } = this.props;

    return (
      <div className="Post_comments row hfeed">
        <div className="column large-12">
          <div className="Post_comments__content">
            <div className="Post__comments_sort_order float-right">
              Sort Order: &nbsp;
              <Dropdown
                inline
                options={this.state.sortOptions}
                defaultValue={this.state.sortOptions[1].value}
                onChange={(event, data) => this.handleChange(event, data)}
              />
            </div>
            {metadata.currentPost.comments &&
              metadata.currentPost.comments
                .sort(this.state.sortFunc)
                .map(comment => <Comment key={comment.id} comment={comment} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata,
  post: ownProps.post
});

const mapDispatchToProps = dispatch => ({
  fetchComments: post => dispatch(fetchPostComments(post))
});

function sortByDate(a, b) {
  return b.timestamp - a.timestamp;
}

function sortByScore(a, b) {
  return b.voteScore - a.voteScore;
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

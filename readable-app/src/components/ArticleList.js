import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, fetchPostsCategory } from "../actions";
import Article from "./Article";
import { Dropdown } from "semantic-ui-react";

class ArticleList extends Component {

  constructor() {
    super();
    this.state = {
      sortOptions: [
        { text: "votes", value: "votes" },
        { text: "age", value: "age" }
      ],
      sortFunc: sortByDate,
      sortDefault: "age"
    };
  }
  componentWillMount() {
    this.handleCategoryChange(this.props.category);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.category != nextProps.category) {
      this.handleCategoryChange(nextProps.category);
    }
    this.setState(prevState => {
      return {
        ...prevState,
        sortFunc: this.props.sort === "New" ? sortByScore : sortByDate,
        sortDefault: this.props.sort === "New" ? "votes" : "age"
      };
    });
  }

  handleCategoryChange = category => {
    if (category === "All") {
      this.props.fetchPosts();
    } else {
      this.props.fetchPostsCategory(category);
    }
  };

  handleChange = (e, data) => {
    this.setState(prevState => {
      return {
        ...prevState,
        sortFunc: data.value === "age" ? sortByDate : sortByScore,
        sortDefault: data.value
      };
    });
  };

  render() {
    const { metadata } = this.props;

    return (
      <article className="articles">
        <div className="articles__header">
          <div>
            <div className="Post__comments_sort_order">
              Sort Order: &nbsp;
              <Dropdown
                inline
                options={this.state.sortOptions}
                value={this.state.sortDefault}
                onChange={(event, data) => this.handleChange(event, data)}
              />
            </div>
            <h1>Trending: {metadata.category}</h1>
          </div>
        </div>
        <hr className="articles__hr" />
        <div className="PostsList">
          <ul className="PostsList__summaries">
            {metadata.posts &&
              metadata.posts
                .sort(this.state.sortFunc)
                .map(post => <Article key={post.id} post={post} />)}
          </ul>
        </div>
      </article>
    );
  }
}

function sortByDate(a, b) {
  return b.timestamp - a.timestamp;
}

function sortByScore(a, b) {
  return b.voteScore - a.voteScore;
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata,
  category: ownProps.category
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPostsCategory: category => dispatch(fetchPostsCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

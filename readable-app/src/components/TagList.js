import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchPostsCategory, fetchPosts } from "../actions";
import { Link } from "react-router-dom";

class TagList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  handleTagChange = category => {
    if (category === "All") {
      this.props.fetchPosts();
    } else {
      this.props.changeCategory(category);
    }
  };

  render() {
    const { metadata, sort } = this.props;

    return (
      <aside className="c-sidebar c-sidebar--left">
        <div className="c-sidebar__module">
          <div className="c-sidebar__header">
            <div className="c-sidebar__h3">Categories</div>
          </div>
          <div className="c-sidebar__content">
            <ul className="c-sidebar__list">
              {metadata.categories &&
                metadata.categories.map(category => (
                  <li key={category.name} className="c-sidebar__list-item">
                    <Link
                      className="tag-link"
                      to={`/view/${sort}/${category.name}`}
                      onClick={event => {
                        this.handleTagChange(category.name);
                      }}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata,
  sort: ownProps.sort
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  changeCategory: category => dispatch(fetchPostsCategory(category)),
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(TagList);

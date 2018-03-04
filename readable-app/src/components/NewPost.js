import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, createPost } from "../actions";
import {
  Button,
  Checkbox,
  Form,
  TextArea,
  Dropdown,
  Message
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";

function randomString(length) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false,
      error: false
    };
  }

  componentWillMount() {
    if (!this.props.categories) {
      this.props.fetchCategories();
    }
  }

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleSubmit = () => {
    if (
      this.state.author != null &&
      this.state.title != null &&
      this.state.body != null &&
      this.state.category != null
    ) {
      this.props.newPost({
        ...this.state,
        id: randomString(23),
        timestamp: Date.now()
      });
      this.setState({ fireRedirect: true, error: false });
    } else {
      this.setState({ fireRedirect: false, error: true });
    }
  };

  render() {
    const { categories, category, currentPost } = this.props;
    const { fireRedirect } = this.state;

    return (
      <div className="SubmitPost">
        <div className="ReplyEditor row">
          <div className="column small-12">
            <Form
              className="vframe"
              onSubmit={this.handleSubmit}
              error={this.state.error}
            >
              <Form.Input
                name="author"
                label="Screen Name"
                placeholder="Enter your screen name."
                onChange={this.handleChange}
              />

              <Form.Input
                name="title"
                label="Title"
                placeholder="Title"
                onChange={this.handleChange}
              />

              <Form.TextArea
                name="body"
                label="Body"
                placeholder="Enter your content here"
                rows="10"
                onChange={this.handleChange}
              />

              <Form.Dropdown
                onChange={this.handleChange}
                label="Category"
                name="category"
                fluid
                search
                selection
                options={categories}
              />

              <Form.Field onChange={this.handleChange}>
                <Checkbox label="I agree to the Terms and Conditions" />
              </Form.Field>
              <Button type="submit">Submit</Button>

              {fireRedirect &&
                currentPost && <Redirect to={"/post/" + currentPost.id} />}
              <Message error content="All fields are required" />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories:
    state.metadata.categories &&
    state.metadata.categories
      .filter(category => category.name != "All")
      .map(category => ({
        text: category.name,
        value: category.name
      })),
  category: state.metadata.category,
  currentPost: state.metadata.currentPost
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  newPost: post => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);

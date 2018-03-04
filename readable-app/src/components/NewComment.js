import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { createComment } from "../actions";

function randomString(length) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

class NewComment extends Component {
  constructor() {
    super();
    this.state = {
      author: "",
      body: ""
    };
  }

  handleSubmit = () => {
    this.props.newComment({
      ...this.state,
      id: randomString(23),
      timestamp: Date.now(),
      parentId: this.props.post.id
    });
    this.setState({ author: "", body: "" });
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  render() {
    return (
      <div>
        <p>Comments:</p>
        <Form className="inputForm" onSubmit={this.handleSubmit}>
          <Form.Input
            name="author"
            label="Screen Name"
            value={this.state.author}
            placeholder="Enter your screen name."
            onChange={this.handleChange}
          />

          <Form.TextArea
            name="body"
            value={this.state.body}
            placeholder="Enter your comment here"
            rows="3"
            onChange={this.handleChange}
          />

          <Button type="submit">Post</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: ownProps.post
});

const mapDispatchToProps = dispatch => ({
  newComment: comment => dispatch(createComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);

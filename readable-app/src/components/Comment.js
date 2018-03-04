import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { voteComment, editComment, deleteComment } from "../actions";
import { Button, Form, Modal, Icon } from "semantic-ui-react";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      body: "",
      modalOpen: false,
    };
  }

  handleVote = (id, direction) => {
    this.props.voteComment(id, { option: `${direction}Vote` }, direction);
  };

  handleEdit = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        editMode: !prevState.editMode,
        body: this.props.comment.body
      };
    });
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleSubmit = () => {
    this.props.editComment(this.props.comment.id, {
      timestamp: Date.now(),
      body: this.state.body
    });

    this.setState(prevState => {
      return {
        ...prevState,
        editMode: !prevState.editMode
      };
    });
  };

  handleDelete = () => {
    this.props.deleteComment(this.props.comment.id);

    this.setState(prevState => {
      return {
        ...prevState,
        modalOpen:false,
      };
    });
  };

  handleClose = () => this.setState({ modalOpen: false });
  handleOpen = () => this.setState({ modalOpen: true });

  render() {
    const { metadata, comment } = this.props;
    let userStyle = {
      backgroundImage:
        "url(https://a.wattpad.com/useravatar/GrumpyCatFan-.256.845414.jpg)"
    };
    return (
      <div className="hentry Comment root">
        <div className="Comment__Userpic show-for-medium">
          <div className="Userpic" style={userStyle} />
        </div>
        <div className="Comment__header">
          <div className="Comment__header_collapse">
            <a onClick={event => this.handleEdit()} title="Collapse/Expand">
              [Edit]
            </a>
            <Modal
              trigger={
                <button
                  onClick={this.handleOpen}
                  className="ui icon button likeButton"
                >
                  <i className="trash icon" />
                </button>
              }
              open={this.state.modalOpen}
              onClose={this.handleClose}
              basic
              size="small"
            >
              <Modal.Content>
                <p>Are you sure you want to delete this comment?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.handleClose}
                  basic
                  color="red"
                  inverted
                >
                  <Icon name="remove" /> No
                </Button>
                <Button  onClick={this.handleDelete} color="green" inverted>
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
          <div className="Comment__header-user">
            <span className="Author">
              <span>
                <strong>
                  <a className="ptc">{comment.author}</a>
                </strong>
              </span>
            </span>
            &nbsp; · &nbsp;
            <a className="PlainLink">
              <span className="updated">
                <span>
                  <Moment fromNow>{comment.timestamp}</Moment>
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="Comment__body entry-content">
          <div className="MarkdownViewer Markdown MarkdownViewer--small">
            {!this.state.editMode && <span> {comment.body} </span>}

            {this.state.editMode && (
              <Form className="inputForm" onSubmit={this.handleSubmit}>
                <Form.TextArea
                  name="body"
                  value={this.state.body}
                  placeholder="Enter your comment here"
                  rows="3"
                  onChange={this.handleChange}
                />
                <Button type="submit">Save</Button>
              </Form>
            )}
          </div>
        </div>

        <div className="Comment__footer">
          <span className="Voting">
            <span className="Voting__inner">
              <button
                onClick={event => {
                  this.handleVote(comment.id, "up");
                }}
                className="ui icon button likeButton"
              >
                <i className="thumbs  up icon" />
              </button>
              <button
                onClick={event => {
                  this.handleVote(comment.id, "down");
                }}
                className="ui icon button likeButton"
              >
                <i className="thumbs  down icon" />
              </button>
              <span className="voteCount">{comment.voteScore}</span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata,
  comment: ownProps.comment
});

const mapDispatchToProps = dispatch => ({
  voteComment: (id, body, direction) =>
    dispatch(voteComment(id, body, direction)),
  editComment: (id, body) => dispatch(editComment(id, body)),
  deleteComment: (id) => dispatch(deleteComment(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

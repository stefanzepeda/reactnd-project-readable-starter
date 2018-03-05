import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  createPost,
  fetchPost,
  editPost,
  deletePost,
  votePostCurrent
} from "../actions";
import {
  Button,
  Checkbox,
  Form,
  TextArea,
  Dropdown,
  Header,
  Icon,
  Modal
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      body: "",
      fireRedirect: false,
      modalOpen: false,
      initialEdit: false,
    };
  }

  componentWillMount() {
    if (this.props.id) {
      this.props.fetchPost(this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.metadata.currentPost) {
      this.setState(prevState => {
        return {
          ...prevState,
          editMode: (this.props.edit&&!this.state.initialEdit),
          modalOpen: this.state.modalOpen||this.props.delete,
          body: this.props.metadata.currentPost.body
        };
      });
    }

  }

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleSubmit = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        editMode: !prevState.editMode,
        initialEdit: this.props.edit,
      };
    });
    this.props.editPost(this.props.metadata.currentPost.id, {
      timestamp: Date.now(),
      body: this.state.body,
    },
    this.props.edit,);

  };

  handleEdit = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        editMode: !prevState.editMode,
        body: this.props.metadata.currentPost.body,
      };
    });
  };

  handleDelete = () => {
    this.props.deletePost(this.props.metadata.currentPost.id);

    this.setState(prevState => {
      return {
        ...prevState,
        fireRedirect: true,
      };
    });
  };

  handleVote = (id, direction) => {
    this.props.votePost(id, { option: `${direction}Vote` }, direction);
  };

  handleClose = () => this.setState({ modalOpen: false , fireRedirect: this.props.delete||this.state.fireRedirect});
  handleOpen = () => this.setState({ modalOpen: true });

  render() {
    var displayStyle = {
      display: "inline-block",
      width: "1.12rem",
      height: "1.12rem"
    };
    const { metadata, id} = this.props;
    let userStyle = {
      backgroundImage:
        "url(https://e3.365dm.com/18/01/1096x616/skynews-grumpy-cat-feline_4214392.jpg?20180125123105)"
    };
    return (
      <div className="column">
        {metadata.currentPost&&
        <article className="PostFull hentry">
          <span>
            <div className="float-right" />
            <div className="PostFull_header">
              <h1 className="entry-title">
                {metadata.currentPost && metadata.currentPost.title}
              </h1>
              <span className="PostFull__time_author_category_large vcard">
                <div className="Userpic" style={userStyle} />
                <div className="right-side">
                  <span className="Author">
                    <strong>
                      {metadata.currentPost && metadata.currentPost.author}
                    </strong>
                  </span>
                  <span>
                    <span> in </span>
                    <Link
                      to={
                        "/view/trending/" +
                        (metadata.currentPost && metadata.currentPost.category)
                      }
                    >
                      {metadata.currentPost && metadata.currentPost.category}{" "}
                    </Link>
                  </span>

                  <span>
                    •
                    <span>
                      {" "}
                      <Moment fromNow>
                        {metadata.currentPost && metadata.currentPost.timestamp}
                      </Moment>
                    </span>
                  </span>
                </div>
              </span>
            </div>
            <div className="PostFull__body entry-content">
              <div className="MarkdownViewer Markdown html">
                {!this.state.editMode && (
                  <div>{metadata.currentPost && metadata.currentPost.body}</div>
                )}

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
          </span>
          <div className="PostFull__footer row">
            <div className="column">
              <span className="PostFull__time_author_category vcard">
                <span className="Icon clock space-right" style={displayStyle}>
                  <svg
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M255.988,32C132.285,32,32,132.298,32,256c0,123.715,100.285,224,223.988,224C379.703,480,480,379.715,480,256 C480,132.298,379.703,32,255.988,32z M391.761,391.765c-10.099,10.098-21.126,18.928-32.886,26.42l-15.946-27.62l-13.856,8 l15.955,27.636c-24.838,13.03-52.372,20.455-81.027,21.624V416h-16v31.825c-28.656-1.166-56.191-8.59-81.03-21.62l15.958-27.641 l-13.856-8l-15.949,27.625c-11.761-7.492-22.79-16.324-32.889-26.424c-10.099-10.099-18.93-21.127-26.422-32.889l27.624-15.949 l-8-13.855L85.796,345.03c-13.03-24.839-20.454-52.374-21.621-81.03H96v-16H64.175c1.167-28.655,8.592-56.19,21.623-81.029 l27.638,15.958l8-13.856l-27.623-15.948c7.492-11.76,16.322-22.787,26.419-32.885c10.1-10.101,21.129-18.933,32.89-26.426 l15.949,27.624l13.856-8l-15.958-27.64C191.81,72.765,219.345,65.34,248,64.175V96h16V64.176 c28.654,1.169,56.188,8.595,81.026,21.626l-15.954,27.634l13.856,8l15.945-27.618c11.76,7.492,22.787,16.323,32.886,26.421 c10.1,10.099,18.931,21.126,26.424,32.887l-27.619,15.946l8,13.856l27.636-15.956c13.031,24.839,20.457,52.373,21.624,81.027H416 v16h31.824c-1.167,28.655-8.592,56.189-21.622,81.028l-27.637-15.957l-8,13.856l27.621,15.947 C410.693,370.637,401.861,381.665,391.761,391.765z" />
                    <path d="M400,241H284.268c-2.818-5.299-7.083-9.708-12.268-12.708V160h-32v68.292c-9.562,5.534-16,15.866-16,27.708 c0,17.673,14.327,32,32,32c11.425,0,21.444-5.992,27.106-15H400V241z" />
                  </svg>
                </span>
                <span className="updated">
                  <span>
                    <Moment fromNow>
                      {metadata.currentPost && metadata.currentPost.timestamp}
                    </Moment>
                  </span>
                </span>
                &nbsp; by &nbsp;
                <span className="Author">
                  <span>
                    <strong>
                      <a className="ptc">
                        {metadata.currentPost && metadata.currentPost.author}
                      </a>
                    </strong>
                  </span>
                </span>
                <span className="Voting">
                  <span className="Voting__inner">
                    <span>
                      &nbsp;&nbsp;
                      <i className="comment icon" />
                      <span> {metadata.currentPost.commentCount}</span>
                    </span>
                    <button
                      onClick={event => {
                        this.handleVote(metadata.currentPost.id, "up");
                      }}
                      className="ui icon button likeButton"
                    >
                      <i className="thumbs  up icon" />
                    </button>
                    <button
                      onClick={event => {
                        this.handleVote(metadata.currentPost.id, "down");
                      }}
                      className="ui icon button likeButton"
                    >
                      <i className="thumbs  down icon" />
                    </button>
                    <span className="voteCount">
                      {metadata.currentPost && metadata.currentPost.voteScore}
                    </span>
                  </span>
                  <a
                    onClick={event => this.handleEdit()}
                    title="Collapse/Expand"
                  >
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
                      <p>Are you sure you want to delete this post?</p>
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
                </span>
              </span>
            </div>
          </div>
          <NewComment post={metadata.currentPost} />
          {metadata.currentPost && <CommentList post={metadata.currentPost} />}
        </article>}
        {!metadata.currentPost&&<h2>404 Not Found</h2> }
        {this.state.fireRedirect && <Redirect to={"/view/Trending/All"} />}
        {metadata.currentPost&&metadata.editRedirect && <Redirect to={`/post/${metadata.currentPost.category}/${metadata.currentPost.id}`} />}


      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  metadata: state.metadata,
  id: ownProps.id,
  edit: ownProps.edit,
  delete: ownProps.delete,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  editPost: (id, body, editRedirect) => dispatch(editPost(id, body, editRedirect)),
  deletePost: (id) => dispatch(deletePost(id)),
  votePost: (id, body, direction) =>
    dispatch(votePostCurrent(id, body, direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

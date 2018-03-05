import * as GrumpyAPIUtil from "../util/api";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

export const FETCH_POSTS = "FETCH_POSTS";

export const FETCH_POST = "FETCH_POST";

export const FETCH_COMMENTS = "FETCH_COMMENTS";

export const NEW_POST = "NEW_POST";

export const NEW_COMMENT = "NEW_COMMENT";

export const VOTE_POST = "VOTE_POST";

export const VOTE_POST_CURRENT = "VOTE_POST_CURRENT";

export const VOTE_COMMENT = "VOTE_COMMENT";

export const EDIT_COMMENT = "EDIT_COMMENT";

export const EDIT_POST = "EDIT_POST";

export const DELETE_POST = "DELETE_POST";

export const DELETE_COMMENT = "DELETE_COMMENT";

export const receiveCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories
});

export const receivePosts = (posts, category) => ({
  type: FETCH_POSTS,
  posts,
  category: category
});

export const receivePost = post => ({
  type: FETCH_POST,
  post
});

export const receiveComments = (post, comments) => ({
  type: FETCH_COMMENTS,
  comments,
  post
});

export const newPost = post => ({
  type: NEW_POST,
  post
});

export const newComment = comment => ({
  type: NEW_COMMENT,
  comment
});

export const votedPost = (post, direction) => ({
  type: VOTE_POST,
  post,
  direction
});

export const votedPostCurrent = (post, direction) => ({
  type: VOTE_POST_CURRENT,
  post,
  direction
});

export const votedComment = (comment, direction) => ({
  type: VOTE_COMMENT,
  comment,
  direction
});

export const editedComment = comment => ({
  type: EDIT_COMMENT,
  comment
});

export const editedPost = (post, editRedirect) => ({
  type: EDIT_POST,
  post,
  editRedirect,
});

export const deletedPost = id => ({
  type: DELETE_POST,
  id
});

export const deletedComment = commentid => ({
  type: DELETE_COMMENT,
  commentid
});

export const fetchCategories = () => dispatch =>
  GrumpyAPIUtil.fetchCategories()
  .then(categories =>
    dispatch(receiveCategories(categories))
  );

export const fetchPosts = () => dispatch =>
  GrumpyAPIUtil.fetchPosts()
  .then(posts =>
    dispatch(receivePosts(posts, "All"))
  );

export const votePost = (id, body, direction) => dispatch =>
  GrumpyAPIUtil.votePost(id, body)
  .then(post =>
    dispatch(votedPost(post, direction))
  );

export const votePostCurrent = (id, body, direction) => dispatch =>
  GrumpyAPIUtil.votePost(id, body)
  .then(post =>
    dispatch(votedPostCurrent(post, direction))
  );

export const voteComment = (id, body, direction) => dispatch =>
  GrumpyAPIUtil.voteComment(id, body)
  .then(comment =>
    dispatch(votedComment(comment, direction))
  );

export const editComment = (id, body) => dispatch =>
  GrumpyAPIUtil.editComment(id, body)
  .then(comment =>
    dispatch(editedComment(comment))
  );

export const editPost = (id, body, editRedirect) => dispatch =>
  GrumpyAPIUtil.editPost(id, body)
  .then(post => dispatch(editedPost(post, editRedirect)));

export const deletePost = (id) => dispatch =>
  GrumpyAPIUtil.deletePost(id)
  .then(post => dispatch(deletedPost(id)));

  export const deleteComment = (id) => dispatch =>
    GrumpyAPIUtil.deleteComment(id)
    .then(post => dispatch(deletedComment(id)));


export const fetchPost = id => dispatch =>
  GrumpyAPIUtil.fetchPost(id)
  .then(post => dispatch(receivePost(post)));

export const fetchPostComments = post => dispatch =>
  GrumpyAPIUtil.fetchPostComments(post.id)
  .then(comments =>
    dispatch(receiveComments(post, comments))
  );

export const fetchPostsCategory = category => dispatch =>
  GrumpyAPIUtil.fetchPostsCategory(category)
  .then(posts =>
    dispatch(receivePosts(posts, category))
  );

export const createPost = post => dispatch =>
  GrumpyAPIUtil.post(post)
  .then(post => dispatch(newPost(post)));

export const createComment = comment => dispatch =>
  GrumpyAPIUtil.comment(comment)
  .then(comment => dispatch(newComment(comment)));

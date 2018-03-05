import {
  FETCH_POSTS,
  FETCH_POST,
  NEW_POST,
  VOTE_POST,
  FETCH_COMMENTS,
  NEW_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  EDIT_POST,
  VOTE_POST_CURRENT,
  DELETE_POST,
  DELETE_COMMENT
} from "../actions";

import { combineReducers } from "redux";
import * as Helper from "../util/Helper";

import {posts} from "./postsReducer"
import {categories} from "./categoriesReducer"

const initialState = {
  category: "All",
  sort: "trending",
  editRedirect: false
};


function metadata(state = initialState, action) {
  const {
    categories,
    posts,
    category,
    post,
    direction,
    id,
    comments,
    comment,
    commentid,
    editRedirect
  } = action;

  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        category: category,
        editRedirect: false,
        currentPost: null
      };
    case FETCH_POST:
      return {
        ...state,
        currentPost:
          Object.keys(post).length === 0 && post.constructor === Object
            ? null
            : post
      };
    case NEW_POST:
      return {
        ...state,
        currentPost: post
      };



    case VOTE_POST_CURRENT:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          voteScore:
            direction === "up"
              ? state.currentPost.voteScore + 1
              : state.currentPost.voteScore - 1
        }
      };
    case VOTE_COMMENT:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: state.currentPost.comments.map((commentTemp, ci) => {
            if (commentTemp.id === comment.id) {
              commentTemp.voteScore =
                direction === "up"
                  ? commentTemp.voteScore + 1
                  : commentTemp.voteScore - 1;
            }
            return commentTemp;
          })
        }
      };

    case EDIT_COMMENT:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: state.currentPost.comments.map((commentTemp, ci) => {
            if (commentTemp.id === comment.id) {
              commentTemp.body = comment.body;
              commentTemp.timestamp = comment.timestamp;
            }
            return commentTemp;
          })
        }
      };

    case EDIT_POST:
      return {
        ...state,
        editRedirect: editRedirect,
        currentPost: {
          ...state.currentPost,
          body: post.body,
          timestamp: post.timestamp
        }
      };

    case DELETE_POST:
      return {
        ...state,
        currentPost: null
      };

    case DELETE_COMMENT:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: state.currentPost.comments.filter((commentTemp, ci) => {
            return commentTemp.id != commentid;
          })
        }
      };

    case FETCH_COMMENTS:
      return {
        ...state,
        currentPost: {
          ...post,
          comments: comments
        }
      };
    case NEW_COMMENT:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          commentCount: state.currentPost.commentCount + 1,
          comments: [...state.currentPost.comments, action.comment]
        }
      };

    default:
      return state;
  }
}

export default combineReducers({
  metadata,
  categories,
  posts,
});

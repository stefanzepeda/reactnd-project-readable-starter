import {
  FETCH_CATEGORIES,
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
  DELETE_COMMENT,
} from "../actions";

import { combineReducers } from "redux";

const initialState = {
  category: "All",
  sort: "trending"
};

function compare(a, b) {
  let nameA = a.name.toUpperCase();
  let nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

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
  } = action;

  switch (action.type) {
    case FETCH_CATEGORIES:
      //Add the All category
      let newCategories = [
        {
          name: "All",
          path: "All"
        }
      ].concat(categories.sort(compare));
      return {
        ...state,
        categories: newCategories
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: posts,
        category: category,
        currentPost: null
      };
    case FETCH_POST:
      return {
        ...state,
        currentPost: post
      };
    case NEW_POST:
      return {
        ...state,
        currentPost: post
      };

    case VOTE_POST:
      let newPosts = state.posts.map((postTemp, ci) => {
        if (postTemp.id === post.id) {
          postTemp.voteScore =
            direction === "up"
              ? postTemp.voteScore + 1
              : postTemp.voteScore - 1;
        }
        return postTemp;
      });
      return {
        ...state,
        posts: newPosts
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
        currentPost: {
          ...state.currentPost,
          body: post.body,
          timestamp: post.timestamp
        }
      };

    case DELETE_POST:
      return {
          ...state,
          currentPost: null,
     };

     case DELETE_COMMENT:
       return {
           ...state,
           currentPost: {
             ...state.currentPost,
             comments: state.currentPost.comments.filter((commentTemp, ci) => {
               return commentTemp.id!=commentid;
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
          comments: [...state.currentPost.comments, action.comment]
        }
      };

    default:
      return state;
  }
}

export default combineReducers({
  metadata
});

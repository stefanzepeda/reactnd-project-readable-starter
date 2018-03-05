import {
  FETCH_POSTS,
  VOTE_POST,
} from "../actions";

export const posts = (state =[], action) => {
  const {
    posts,
    post,
    direction,
  } = action;

  switch (action.type) {
    case FETCH_POSTS:
      return (
         posts
      )
      case VOTE_POST:
        return (
          state.map((postTemp, ci) => {
            if (postTemp.id === post.id) {
              postTemp.voteScore =
                direction === "up"
                  ? postTemp.voteScore + 1
                  : postTemp.voteScore - 1;
            }
            return postTemp;
          })
        )
      default:
        return state;
  }
}

import {
  FETCH_CATEGORIES,
} from "../actions";

import * as Helper from "../util/Helper";

export const categories = (state = [], action) => {
  const {
    categories,
  } = action;

  switch (action.type) {
    case FETCH_CATEGORIES:
      //Add the All category
      return (
        [
          {
            name: "All",
            path: "All"
          }
        ].concat(categories.sort(Helper.compare))
      );
    default:
      return state;
  }
}

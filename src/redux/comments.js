import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';
//when u receive a comment
export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            //comment id = 0,1,2,3 so comments length will be no. of comments in shared/componenents (js array)
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return state.concat(comment);
        default:
          return state;
      }
};
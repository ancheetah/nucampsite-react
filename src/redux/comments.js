// This reducer handles the comments part of the state

import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

// The comments reducer takes the comments part of the state and
// a Redux action object {type, payload} and makes some change to
// the state before returning a new, updated (comments) state

export const Comments = (state = COMMENTS, action) => { 
// the state is initialized with the comments array (an arr of obj)
// console.log("old state:", state);
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:   // addComment(campsiteId, rating, author, text)
            const comment = action.payload; //an object with the property identifiers campsiteId, rating, author, text

            // Add a couple more properties called id and length
            comment.id = state.length;  // length of comments array
            comment.date = new Date().toISOString();

            // Return the updated state to the redux store
            // The state here is a string array of comments
            // console.log("new state", state.concat(comment));
            return state.concat(comment); 
        default:
            return state;
    }
};

// Next step: Update MainComponent and CampsiteInfoComponent to dispatch the ADD_COMMENT action
// This reducer handles the comments part of the state
import * as ActionTypes from './ActionTypes';

// The comments reducer takes the comments part of the state and
// a Redux action object {type, payload} and makes some change to
// the state before returning a new, updated (comments) state

export const Comments = (state = { errMess: null, comments: []}, action) => { 
// the state is initialized with the comments array (an arr of obj)
// console.log("old state:", state);
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:   // addComment(campsiteId, rating, author, text)
            const comment = action.payload; //an object with the property identifiers campsiteId, rating, author, text

            // Return the updated state to the redux store
            // The state here is a string array of comments
            // console.log("new state", state.concat(comment));
            return {...state, comments: state.comments.concat(comment)}; 
        default:
            return state;
    }
};

// Next step: Update MainComponent and CampsiteInfoComponent to dispatch the ADD_COMMENT action
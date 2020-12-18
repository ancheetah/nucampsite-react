// This is where we define all the action creators
// Action creators return an action object with the property identifiers "type" and "payload"
// The "payload" (arbitrary name) contains the data you want to send to the state to update it
import * as ActionTypes from './ActionTypes';

// Define the addComment action creator
// Its parameters are the part of the state the action will change
export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,  // match with name in ActionTypes.js
    payload: {
        campsiteId,    // this is ES6 notation equivalent to campsiteId: campsiteId
        rating,        // can use this syntax when value name is same as property name
        author,
        text
        /*
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
        */
    }
});

// Next step: Update the comments reducer to update its part of the state
// when the ADD_COMMENT action is dispatched to the store
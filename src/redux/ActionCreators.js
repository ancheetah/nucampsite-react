import * as ActionTypes from './ActionTypes';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId,    // this is ES6 notation equivalent to campsiteId: campsiteId
        rating,        // can use this syntax when value name is same as property name
        author,
        text
    }
});
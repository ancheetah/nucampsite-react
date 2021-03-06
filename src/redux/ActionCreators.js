// This is where we define all the action creators
// Action creators return an action object with the property identifiers "type" and "payload"
// The "payload" (arbitrary name) contains the data you want to send to the state to update it
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import {CAMPSITES} from '../shared/campsites';

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
}); // Next step: Update the comments reducer to update its part of the state
    // when the ADD_COMMENT action is dispatched to the store


//===== Redux Thunk and Logger Actions =======

// For now we simulate a server with a brief delay using setTimeout()
export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    // setTimeout(() => {
    //     dispatch(addCampsites(CAMPSITES));
    // }, 2000); // 2000 ms = 2 sec

    return fetch(baseUrl + 'campsites')
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)));
}

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchComments = () => dispatch => {    
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});
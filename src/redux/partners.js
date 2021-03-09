// This reducer handles the partners part of the state
// import { PARTNERS } from '../shared/partners';
import * as ActionTypes from './ActionTypes';

export const Partners = (state = {
                                    isLoading: true,
                                    errMess: null,
                                    partners: []
                                }, action) => {
    switch (action.type) {
        case ActionTypes.PARTNERS:
            return {
                ...state, isLoading: false, errMess: null, partners: action.payload
            };

        case ActionTypes.PARTNERS_LOADING:
            return {
                ...state, isLoading: true, errMess: null, partners: []
            }

            case ActionTypes.PARTNERS_FAILED:
                return {
                    ...state, isLoading: false, errMess: action.payload
                };

            default:
                return state;
    }
};
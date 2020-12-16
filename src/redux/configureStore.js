import { createStore, combineReducers } from 'redux';
//import { Reducer, initialState } from './reducer';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';

// The Redux createStore() function requires that all your reducers 
// be combined into ONE single root reducer to be used as an argument
// to createStore().

export const ConfigureStore = () => {
    //const store = createStore( Reducer, initialState );
    const store = createStore(
        combineReducers({
            campsites: Campsites,   // the property identifiers here
            comments: Comments,     // define how the data from the
            partners: Partners,     // reducers will be kept in the 
            promotions: Promotions  // overall state object tree
        })
    );
    return store;
};
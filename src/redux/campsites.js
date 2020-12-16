import { CAMPSITES } from '../shared/campsites';

// Create a reducer which will take a section of the state
// and update it with a Redux action object
// Initialize the state with CAMPSITES if it doesn't exist
export const Campsites = (state = CAMPSITES, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
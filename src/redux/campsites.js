import { CAMPSITES } from '../shared/campsites';

// Create a reducer
// Initialize the state with CAMPSITES if it doesn't exist
export const Campsites = (state = CAMPSITES, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
/*
 Description: Redux slice for interactions
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Import the necessary function from Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for the interactions slice
const initialState = {
    recommendations: 0,
    bookmarks: 0,
    checkIns: 0,
};

// Define the initial state for the interactions slice
export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState,
    reducers: {
        // Add a recommendation interaction to the state
        addRecommendationInteraction: state => {
            state.recommendations = state.recommendations + 1;
        },
        // Add a bookmark interaction to the state
        addBookmarkInteraction: state => {
            state.bookmarks = state.bookmarks + 1;
        },
        // Add a check-in interaction to the state
        addCheckInInteraction: state => {
            state.checkIns = state.checkIns + 1;
        },
        // Remove a recommendation interaction from the state
        removeRecommendationInteraction: state => {
            state.recommendations = state.recommendations - 1;
        },
        // Remove a bookmark interaction from the state
        removeBookmarkInteraction: state => {
            state.bookmarks = state.bookmarks - 1;
        },
        // Remove a check-in interaction from the state
        removeCheckInInteraction: state => {
            state.checkIns = state.checkIns - 1;
        },
        // Set the interactions in the state
        setInteractions: (state, action) => {
            const {recommendations, bookmarks, checkIns} = action.payload;
            state.recommendations = recommendations;
            state.bookmarks = bookmarks;
            state.checkIns = checkIns;
        },
        // Reset the interactions in the state
        resetInteractions: state => {
            state.recommendations = 0;
            state.bookmarks = 0;
            state.checkIns = 0;
        }
    }
});

// Export actions from the interactions slice
export const {
    addRecommendationInteraction,
    addBookmarkInteraction,
    addCheckInInteraction,
    removeRecommendationInteraction,
    removeBookmarkInteraction,
    removeCheckInInteraction,
    setInteractions,
    resetInteractions
} = interactionsSlice.actions;

// Export the selector functions from the interactions slice
export const selectRecommendationInteractions = state => state.interactions.recommendations;
export const selectBookmarkInteractions = state => state.interactions.bookmarks;
export const selectCheckInInteractions = state => state.interactions.checkIns;

// Export the reducer from the interactions slice
export default interactionsSlice.reducer;
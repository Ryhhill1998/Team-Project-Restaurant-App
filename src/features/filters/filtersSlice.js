/*
 Description: Redux slice for filters
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Import the necessary function from Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for the filters slice
const initialState = {
    sortBy: null,
    cuisine: "Any",
    appliedSortByFilter: null,
    appliedCuisineFilter: null
};

// Create and export the filters slice
export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // Update the sortBy filter in the state
        updateSortFilter: (state, action) => {
            state.sortBy = action.payload;
        },
        // Reset the sortBy filter to its initial state
        resetSortFilter: state => {
            state.sortBy = null;
        },
        // Update the cuisine filter in the state
        updateCuisineFilter: (state, action) => {
            state.cuisine = action.payload;
        },
        // Reset the cuisine filter to its initial state
        resetCuisineFilter: state => {
            state.cuisine = "Any";
        },
        // Apply the filters to the appliedSortByFilter and appliedCuisineFilter properties in the state
        applyFilters: state => {
            state.appliedSortByFilter = state.sortBy ? state.sortBy : null;
            state.appliedCuisineFilter = state.cuisine !== "Any" ? state.cuisine : null;
        },
        // Remove the applied filter and reset it in the state
        removedAppliedFilter: (state, action) => {
            const filter = action.payload;

            if (filter === "sortBy") {
                state.appliedSortByFilter = null;
                state.sortBy = null;
            } else if (filter === "cuisine") {
                state.appliedCuisineFilter = null;
                state.cuisine = "Any";
            }
        },
        // Reset all filters to their initial states
        resetFilters: state => {
            state.sortBy = null;
            state.appliedSortByFilter = null;
            state.cuisine = "Any";
            state.appliedCuisineFilter = null;
        }
    }
});

// Export actions from the filters slice
export const {
    updateSortFilter,
    resetSortFilter,
    updateCuisineFilter,
    resetCuisineFilter,
    applyFilters,
    removedAppliedFilter,
    resetFilters
} = filtersSlice.actions;

// Export selectors for the filters slice
export const selectSortFilter = state => state.filters.sortBy;
export const selectCuisineFilter = state => state.filters.cuisine;
export const selectAppliedSortFilter = state => state.filters.appliedSortByFilter;
export const selectAppliedCuisineFilter = state => state.filters.appliedCuisineFilter;

// Export the filters slice reducer
export default filtersSlice.reducer;
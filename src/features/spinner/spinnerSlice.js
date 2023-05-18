/*
 Description: Redux slice for spinner
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // Import the necessary function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'

// Define the initial state for the spinner slice
const initialState = {
    visible: false,
};

// Create and export the spinner slice
export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        // Hide the spinner
        hideSpinner: state => {
            state.visible = false;
        },
        // Show the spinner
        showSpinner: state => {
            state.visible = true;
        }
    }
});

// Action creators are generated for each case reducer function
export const {hideSpinner, showSpinner} = spinnerSlice.actions
export const selectSpinnerIsVisible = state => state.spinner.visible;

// Export the reducer from the spinner slice
export default spinnerSlice.reducer
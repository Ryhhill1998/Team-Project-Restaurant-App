/*
 Description: Redux slice for slider
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// Import the necessary function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'

// Define the initial state for the slider slice
const initialState = {
    activeSlide: 0,
    lastSlide: 0,
    isActive: true,
};

// Create and export the slider slice
export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        // Set the active slide
        setActiveSlide: (state, action) => {
            state.activeSlide = action.payload;
        },
        // Set the last slide
        setLastSlide: (state, action) => {
            state.lastSlide = action.payload - 1;
        },
        // Change the active slide
        changeSlide: (state, action) => {
            if (!state.isActive) return;

            const direction = action.payload;

            if (direction === "forward") {
                if (state.activeSlide !== state.lastSlide) {
                    state.activeSlide = state.activeSlide + 1;
                }
            } else if (direction === "backward") {
                if (state.activeSlide !== 0) {
                    state.activeSlide = state.activeSlide - 1;
                }
            }
        },
        // Activate the slider
        activateSlider: state => {
            state.isActive = true;
        },
        // Deactivate the slider
        deactivateSlider: state => {
            state.isActive = false;
        }
    }
})

// Export the actions and selectors from the slider slice
export const {setActiveSlide, setLastSlide, changeSlide, activateSlider, deactivateSlider} = sliderSlice.actions
export const selectActiveSlide = state => state.slider.activeSlide;
export const selectSliderIsActive = state => state.slider.isActive;
// Export the reducer from the slider slice
export default sliderSlice.reducer
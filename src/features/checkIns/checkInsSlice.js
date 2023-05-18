/*
 Description: Redux slice for checkIns
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for the checkIns slice
const initialState = {
    checkIns: [],
    selectedCheckIns: [],
    selectedCheckIn: {},
};

// Create and export the checkIns slice
export const checkInsSlice = createSlice({
    name: 'checkIns',
    initialState,
    reducers: {
        // Set the entire checkIns array
        setCheckIns: (state, action) => {
            state.checkIns = action.payload;
        },
        // Remove a single checkIn by its ID
        removeCheckIn: (state, action) => {
            state.checkIns = state.checkIns.filter(checkIn => checkIn.id !== action.payload);
        },
        // Update a single checkIn by its ID
        updateCheckIn: (state, action) => {
            const updatedCheckIn = action.payload;

            state.checkIns = state.checkIns
                .map(checkIn => checkIn.id === updatedCheckIn.id ? updatedCheckIn : checkIn);
        },
        // Set the selectedCheckIns array
        setSelectedCheckIns: (state, action) => {
            state.selectedCheckIns = action.payload;
        },
         // Set the selectedCheckIns array by checkIn ID
        setSelectedCheckInsById: (state, action) => {
            const {date: checkInDate} = state.checkIns.find(({id}) => id === action.payload);
            state.selectedCheckIns = state.checkIns.filter(({date}) => date === checkInDate);
        },
        // Set the selectedCheckIn object
        setSelectedCheckIn: (state, action) => {
            state.selectedCheckIn = action.payload;
        },
        // Add route coordinates to the checkIns array
        addCheckInsRouteCoordinates: (state, action) => {
            state.routeCoordinates = [...state.routeCoordinates, ...action.payload];
        }
    },
})
// Export actions from the checkIns slice
export const {
    setCheckIns,
    removeCheckIn,
    updateCheckIn,
    setSelectedCheckIns,
    setSelectedCheckIn,
    setSelectedCheckInsById,
} = checkInsSlice.actions;

// Export selectors for the checkIns slice
export const selectCheckIns = state => state.checkIns.checkIns;
export const selectSelectedCheckIns = state => state.checkIns.selectedCheckIns;
export const selectSelectedCheckIn = state => state.checkIns.selectedCheckIn;

// Export the checkIns slice reducer
export default checkInsSlice.reducer;
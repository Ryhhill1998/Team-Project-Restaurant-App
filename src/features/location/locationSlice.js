/*
 Description: Redux slice for location
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// Definition of the location slice of the Redux store
import {createSlice} from '@reduxjs/toolkit'

// Define the initial state for the location slice
const initialState = {
    userPosition: {
        latitude: localStorage.getItem("latitude") ?
            JSON.parse(localStorage.getItem("latitude"))
            :
            54.972,
        longitude: localStorage.getItem("longitude") ?
            JSON.parse(localStorage.getItem("longitude"))
            :
            -1.605
    },
    locationDescription: localStorage.getItem("locationDescription") ?
        JSON.parse(localStorage.getItem("locationDescription"))
        :
        "Newcastle upon Tyne",
    usingCurrentLocation: false
};

// Define the location slice of the Redux store
export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        // Update the user's position in the state
        updateUserPosition: (state, action) => {
            const {longitude, latitude} = action.payload;
            state.userPosition.longitude = longitude;
            state.userPosition.latitude = latitude;
        },
        // Update the location description in the state
        setLocationDescription: (state, action) => {
            state.locationDescription = action.payload;
        },
        // Set the location description in the state to the user's current location
        setUsingCurrentLocation: state => {
            state.usingCurrentLocation = true;
            state.locationDescription = "Current location";
        },
        // Set the location description in the state to a custom location
        setUsingCustomLocation: state => {
            state.usingCurrentLocation = false;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    updateUserPosition,
    setLocationDescription,
    setUsingCurrentLocation,
    setUsingCustomLocation,
} = locationSlice.actions

// Export selectors from the location slice
export const selectUserPosition = state => state.location.userPosition;
export const selectLocationDescription = state => state.location.locationDescription;
export const selectUsingCurrentLocation = state => state.location.usingCurrentLocation;
// Export the reducer from the location slice
export default locationSlice.reducer
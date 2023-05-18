/*
Description: Redux store setup
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

import { configureStore } from '@reduxjs/toolkit';

// import all constructed reducers from slices
import mapReducer from "../features/map/mapSlice";
import restaurantsReducer from "../features/restaurants/restaurantsSlice"
import filtersReducer from "../features/filters/filtersSlice";
import sliderReducer from "../features/slider/sliderSlice";
import locationReducer from "../features/location/locationSlice";
import spinnerReducer from "../features/spinner/spinnerSlice";
import userReducer from "../features/user/userSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import checkInsReducer from "../features/checkIns/checkInsSlice";
import interactionsReducer from "../features/interactions/interactionsSlice";

export default configureStore({
    reducer: {
        map: mapReducer,
        restaurants: restaurantsReducer,
        filters: filtersReducer,
        slider: sliderReducer,
        location: locationReducer,
        spinner: spinnerReducer,
        user: userReducer,
        reviews: reviewsReducer,
        checkIns: checkInsReducer,
        interactions: interactionsReducer,
    }
});
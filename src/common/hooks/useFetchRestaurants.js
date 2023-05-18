/*
Description: Fetch restaurants custom hook - tells redux store to fetch restaurant data from API
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {
    fetchRestaurants,
    selectLastPositionQueried,
    selectRestaurantsFetchStatus
} from "../../features/restaurants/restaurantsSlice";
import {resetDisplayedRestaurant} from "../../features/map/mapSlice";
import {selectUserPosition} from "../../features/location/locationSlice";
import {hideSpinner} from "../../features/spinner/spinnerSlice";

// react imports
import {useEffect} from "react";

const useFetchRestaurants = () => {

    // initialise dispatch - connection to redux
    const dispatch = useDispatch();

    // redux selectors
    const restaurantsStatus = useSelector(selectRestaurantsFetchStatus);
    const userPosition = useSelector(selectUserPosition);
    const lastPositionQueried = useSelector(selectLastPositionQueried);

    // fetch restaurants whenever user position changes
    useEffect(() => {
        // If restaurants are already being fetched, user position is not available, or user position is the same as
        // the last queried position, hide the spinner and return
        if (restaurantsStatus !== "idle" || !userPosition
            || positionsAreEqual(userPosition, lastPositionQueried)) {
            dispatch(hideSpinner());
            return;
        }

        dispatch(resetDisplayedRestaurant());
        dispatch(fetchRestaurants(userPosition));
    }, [userPosition]);

    // check if user is requesting data from a very similar location
    const positionsAreEqual = (position1, position2) => {
        const {longitude: lon1, latitude: lat1} = position1;
        const {longitude: lon2, latitude: lat2} = position2;

        return Math.abs(lon1 - lon2) < 0.001 && Math.abs(lat1 - lat2) < 0.001;
    }
};

export default useFetchRestaurants;
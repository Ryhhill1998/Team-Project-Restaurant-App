/*
Description: Fetch restaurants custom hook - tells redux store to fetch restaurant data from API
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";
import {setActiveSlide, setLastSlide} from "../../features/slider/sliderSlice";
import {displayRestaurant} from "../../features/map/mapSlice";

// react imports
import {useEffect} from "react";

const useInitialiseSlider = () => {

    // initialise dispatch
    const dispatch = useDispatch();

    // select restaurants from redux
    const restaurants = useSelector(selectRestaurants);

    // restart slider whenever restaurant data changes
    useEffect(() => {
        if (!restaurants) return;

        dispatch(displayRestaurant(restaurants[0]));
        dispatch(setActiveSlide(0));
        dispatch(setLastSlide(restaurants.length));
    }, [restaurants]);
};

export default useInitialiseSlider;
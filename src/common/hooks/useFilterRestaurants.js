/*
Description: Fetch restaurants custom hook - tells redux store to fetch restaurant data from API
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {
    filterRestaurantResultsByCuisine,
    selectAllRestaurants,
    sortRestaurants
} from "../../features/restaurants/restaurantsSlice";
import {selectCuisineFilter, selectSortFilter} from "../../features/filters/filtersSlice";

// react imports
import {useEffect} from "react";

const useFilterRestaurants = () => {

    // initialise dispatch - connection to redux
    const dispatch = useDispatch();

    // redux selectors
    const allRestaurants = useSelector(selectAllRestaurants);
    const cuisineFilter = useSelector(selectCuisineFilter);
    const sortByFilter = useSelector(selectSortFilter);

    // sort/filter restaurant results using saved filters whenever restaurants change due to new API call
    useEffect(() => {
        if (!allRestaurants || !cuisineFilter || !sortByFilter) return;

        dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        dispatch(sortRestaurants(sortByFilter));
    }, [allRestaurants]);
};

export default useFilterRestaurants;
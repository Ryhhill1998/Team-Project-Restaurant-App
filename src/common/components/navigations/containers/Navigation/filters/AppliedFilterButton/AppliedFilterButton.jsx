/*
Description: Applied filter button component displayed on lower nav when a filter is selected
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./AppliedFilterButton.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {
    removedAppliedFilter,
    selectCuisineFilter,
    selectSortFilter
} from "../../../../../../../features/filters/filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../../../../../features/restaurants/restaurantsSlice";

// AppliedFilterButton component
const AppliedFilterButton = ({type, filter}) => {

    // initialise dispatch
    const dispatch = useDispatch();

    // redux selectors
    const sortFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    // handler for clicking close button
    const handleCloseButtonClick = () => {
        // remove applied filter
        dispatch(removedAppliedFilter(type));

        if (type === "sortBy") {
            // reapply cuisine filter, if applicable - automatically removes sort by filter
            dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        } else {
            // reset results
            dispatch(resetRestaurantResults());
            // sort restaurants by sort filter
            dispatch(sortRestaurants(sortFilter));
        }
    };

    return (
        <div className="filter-selected">
            <button className="close-button" onClick={handleCloseButtonClick}>
                <FontAwesomeIcon className="icon" icon={faXmark}/>
            </button>

            {filter}
        </div>
    );
};

export default AppliedFilterButton;
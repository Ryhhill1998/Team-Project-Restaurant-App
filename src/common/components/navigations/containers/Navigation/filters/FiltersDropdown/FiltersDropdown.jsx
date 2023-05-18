/*
Description: Filters dropdown component which overlays homepage and map page when filters button clicked
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./FiltersDropdown.css";

// component imports
import SortByOptions from "./SortByOptions/SortByOptions";
import CuisineOptions from "./CuisineOptions/CuisineOptions";
import PrimaryButtonView from "../../../../../buttons/views/PrimaryButtonView/PrimaryButtonView";
import OverlayView from "../../../../../OverlayView/OverlayView";

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {
    applyFilters, resetFilters,
    selectCuisineFilter,
    selectSortFilter,
} from "../../../../../../../features/filters/filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../../../../../features/restaurants/restaurantsSlice";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBan} from "@fortawesome/free-solid-svg-icons";

// react imports
import {useEffect, useState} from "react";

// FiltersDropdown component
const FiltersDropdown = ({closePopup}) => {

    // initialise dispatch
    const dispatch = useDispatch();

    // redux selectors
    const sortFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    // handler for when apply filters button clicked
    const handleApplyClick = () => {
        dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        dispatch(sortRestaurants(sortFilter));
        dispatch(applyFilters());
        closePopup();
    };

    // handler for when reset filters button clicked
    const handleResetClick = () => {
        dispatch(resetFilters());
        dispatch(resetRestaurantResults());
    };

    // state variables
    const [filtersAppliedCount, setFiltersAppliedCount] = useState(0);

    // count number of filters applied when filters changes
    useEffect(() => {
        let count = 0;

        if (sortFilter) count++;
        if (cuisineFilter !== "Any") count++;

        setFiltersAppliedCount(count);

    }, [sortFilter, cuisineFilter]);

    return (
        <>
            <div className="filters-dropdown-container container">
                <div className="filters-dropdown">
                    <div className="filters-header">
                        <div className="action-buttons-container container">
                            <button onClick={() => closePopup()}>
                                <FontAwesomeIcon icon={faArrowLeft} className="icon"/>
                                Back
                            </button>

                            <h2>Filters</h2>

                            <button onClick={handleResetClick}>
                                <FontAwesomeIcon icon={faBan} className="ban-icon"/>
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="filters container">
                        <div className="sort-options-container">
                            <h3>Sort by</h3>

                            <SortByOptions/>
                        </div>

                        <div className="cuisine-filters">
                            <h3>Cuisine</h3>

                            <CuisineOptions/>
                        </div>

                        <PrimaryButtonView
                            text="Apply"
                            handleClick={handleApplyClick}
                            children={filtersAppliedCount > 0 && (
                                <span className="filters-applied-count">({filtersAppliedCount})</span>
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* overlay component to make underneath UI unclickable */}
            <OverlayView/>
        </>
    );
};

export default FiltersDropdown;
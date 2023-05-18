/*
Description: Navigation component present on map page and homepage
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./Navigation.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faMapLocationDot,
    faSliders,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

// react router imports
import {Link} from "react-router-dom";

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {selectAppliedCuisineFilter, selectAppliedSortFilter} from "../../../../../features/filters/filtersSlice";
import {
    filterResultsBySearchQuery,
    resetRestaurantResults,
    selectHasMatches
} from "../../../../../features/restaurants/restaurantsSlice";

// component imports
import SearchBoxView from "../../views/SearchBoxView/SearchBoxView";
import AppliedFilterButton from "./filters/AppliedFilterButton/AppliedFilterButton";
import LocationButtonView from "./location/views/LocationButtonView/LocationButtonView";
import LocationOptions from "./location/containers/LocationOptions/LocationOptions";
import FiltersDropdown from "./filters/FiltersDropdown/FiltersDropdown";

// react imports
import {useEffect, useRef, useState} from "react";

// Navigation component
const Navigation = ({view, setNavHeight}) => {

    // initialise dispatch
    const dispatch = useDispatch();

    // redux selectors
    const appliedSortFilter = useSelector(selectAppliedSortFilter);
    const appliedCuisineFilter = useSelector(selectAppliedCuisineFilter);
    const searchHasMatches = useSelector(selectHasMatches);

    // ref for navigation container
    const ref = useRef();

    // state variables
    const [locationOptionsAreVisible, setLocationOptionsAreVisible] = useState(false);
    const [filtersAreVisible, setFiltersAreVisible] = useState(false);
    const [searchIsFocused, setSearchIsFocused] = useState(false);

    // icon variable for back button, determined by current view
    const icon = view === "home" ? faMapLocationDot : faArrowLeft;

    // sets nav height when search focus changes since it is smaller in search mode
    useEffect(() => {
        if (!setNavHeight) return;

        setNavHeight(ref.current?.offsetHeight);
    }, [searchIsFocused]);

    // handler function for when the search bar is focused
    const handleFocus = () => {
        setSearchIsFocused(true);
    };

    // handler function for when the cancel button is clicked in search mode - exits search mode
    const handleCancelClick = () => {
        setSearchIsFocused(false);
        dispatch(resetRestaurantResults());
    };

    return (
        <div ref={ref} className="navigation-container">
            <div className="navigation">
                <div className="upper">
                    {/* back button - render conditionally if not in search mode */}
                    {!searchIsFocused && (
                        <Link to={view === "home" ? "/map" : "/"} className="button">
                            <FontAwesomeIcon className="icon" icon={icon}/>
                        </Link>
                    )}

                    {/* search and filters container */}
                    <div className="search-and-filters">
                        <SearchBoxView
                            handleInputChange={(query) => dispatch(filterResultsBySearchQuery(query))}
                            hasMatches={searchHasMatches}
                            handleFocus={handleFocus}
                            focused={searchIsFocused}
                        />

                        {/* hide filters if search mode */}
                        {!searchIsFocused && (
                            <button
                                className="button filter-button"
                                onClick={() => setFiltersAreVisible(true)}
                            >
                                <FontAwesomeIcon className="icon" icon={faSliders}/>
                            </button>
                        )}

                        {/* show cancel button if in search mode */}
                        {searchIsFocused && (
                            <button className="cancel" onClick={handleCancelClick}>
                                Cancel
                            </button>
                        )}
                    </div>

                    {/* hide profile button if in search mode */}
                    {!searchIsFocused && (
                        <Link to="/profile" className="button">
                            <FontAwesomeIcon className="icon" icon={faUser}/>
                        </Link>
                    )}
                </div>

                {/* lower navigation - hide if in search mode */}
                {!searchIsFocused && (
                    <div className="lower">
                        {/* location button */}
                        <LocationButtonView
                            handleClick={() => setLocationOptionsAreVisible(locationOptionsAreVisible => !locationOptionsAreVisible)}
                            optionsOpen={locationOptionsAreVisible}
                        />

                        {/* applied filter buttons */}
                        {appliedSortFilter && (
                            <AppliedFilterButton type="sortBy" filter={appliedSortFilter}/>
                        )}

                        {appliedCuisineFilter && (
                            <AppliedFilterButton type="cuisine" filter={appliedCuisineFilter}/>
                        )}
                    </div>
                )}
            </div>

            {/* filters dropdown */}
            {!searchIsFocused && filtersAreVisible && (
                <FiltersDropdown closePopup={() => setFiltersAreVisible(false)}/>
            )}

            {/* location dropdown */}
            {!searchIsFocused && locationOptionsAreVisible && (
                <LocationOptions closePopup={() => setLocationOptionsAreVisible(false)}/>
            )}
        </div>
    );
};

export default Navigation;

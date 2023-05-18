/*
Description: Sort by options component which is on filter dropdown
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./SortByOptions.css";

// component imports
import SortButtonView from "./SortButtonView/SortButtonView";

// redux imports
import {
    resetSortFilter,
    selectSortFilter,
    updateSortFilter
} from "../../../../../../../../features/filters/filtersSlice";
import {useDispatch, useSelector} from "react-redux";

// sort by options declared outside component so they are not redeclared on each render
const sortByOptions = ["Distance", "Rating", "Price"];

// SortByOptions component
const SortByOptions = () => {

    // initialise dispatch
    const dispatch = useDispatch();

    // redux selector - get applied sort filter
    const sortByFilter = useSelector(selectSortFilter);

    // handler for when sort button is clicked
    const handleSortButtonClick = (name) => {
        if (name === sortByFilter) {
            // reset sort by filter if selected filter clicked again
            dispatch(resetSortFilter());
        } else {
            // change sort by filter to new filter clicked
            dispatch(updateSortFilter(name));
        }
    };

    return (
        <div className="sort-buttons-container">
            {sortByOptions.map((name, i) => (
                <SortButtonView
                    key={i}
                    name={name}
                    selected={sortByFilter === name}
                    handleClick={handleSortButtonClick}
                />
            ))}
        </div>
    );
};

export default SortByOptions;
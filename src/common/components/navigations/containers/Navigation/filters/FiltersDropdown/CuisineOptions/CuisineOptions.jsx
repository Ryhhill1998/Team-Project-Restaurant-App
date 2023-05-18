/*
Description: Cuisine options component which is on filter dropdown
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./CuisineOptions.css";

// component imports
import CuisineButtonView from "./CuisineButtonView/CuisineButtonView";

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {
    resetCuisineFilter,
    selectCuisineFilter,
    updateCuisineFilter
} from "../../../../../../../../features/filters/filtersSlice";


// cuisine options declared outside component to make sure only declared once
const cuisineOptions = [
    "Any",
    "British",
    "Chinese",
    "European",
    "Burger",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Pizza",
    "Pub",
    "Bar",
    "Spanish",
    "Steak",
    "Sushi",
    "Thai"
];

// CuisineOptions component
const CuisineOptions = () => {

    // initialise dispatch
    const dispatch = useDispatch();

    // cuisine filter redux selector
    const cuisineFilter = useSelector(selectCuisineFilter);

    // handler function for when cuisine option clicked
    const handleCuisineOptionClick = (name) => {
        if (name === cuisineFilter) {
            // reset filter if selected filter clicked again
            dispatch(resetCuisineFilter());
        } else {
            // update cuisine filter to newly clicked filter
            dispatch(updateCuisineFilter(name));
        }
    };

    return (
        <div className="cuisine-options-container">
            {cuisineOptions.map((name, i) => (
                <CuisineButtonView
                    key={i}
                    name={name}
                    selected={cuisineFilter === name}
                    handleClick={handleCuisineOptionClick}
                />
            ))}
        </div>
    );
};

export default CuisineOptions;
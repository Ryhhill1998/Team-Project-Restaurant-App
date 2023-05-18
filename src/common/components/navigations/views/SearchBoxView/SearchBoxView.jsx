/*
Description: Search box component present on Navigation and Profile Navigation components
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./SearchBoxView.css";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

// react imports
import {useEffect, useState} from "react";

// component imports
import SearchFeedbackView from "./SearchFeedbackView/SearchFeedbackView";
import InteractionButtonView from "../../../buttons/views/InteractionButtonView/InteractionButtonView";

// SearchBoxView component
const SearchBoxView = ({handleInputChange, hasMatches = true, handleFocus, focused}) => {

    // state variables - query
    const [searchQuery, setSearchQuery] = useState("");

    // reset query when not focused
    useEffect(() => {
        if (!focused) {
            setSearchQuery("");
        }
    }, [focused]);

    // handler function for when query in search input changes
    const handleChange = ({target}) => {
        const {value} = target;
        setSearchQuery(value);
        handleInputChange(value);
    };

    // handler function for when clear search button clicked
    const handleClearClick = () => {
        setSearchQuery("");
        handleInputChange("");
    };

    return (
        <div className="search-box">
            <div className="input-container">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchQuery}
                    onFocus={handleFocus}
                />

                {/* condtionally render clear search button if query is not empty */}
                {searchQuery && (
                    <InteractionButtonView icon={faCircleXmark} handleClick={handleClearClick}/>
                )}
            </div>

            {searchQuery && !hasMatches && <SearchFeedbackView/>}
        </div>
    );
};

export default SearchBoxView;
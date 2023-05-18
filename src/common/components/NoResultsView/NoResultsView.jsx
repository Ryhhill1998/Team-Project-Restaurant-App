/*
Description: No results component for use when any search query returns no results
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// stylesheet
import "./NoResultsView.css";

// taco img src import
import TacoCharacter from "../../images/errorImage.png";

const NoResultsView = ({ mainText, subText }) => {
    return (
        <div className="no-results">
            <img src={TacoCharacter} alt="Taco-character" className="no-results-image" />
            <div className="no-results-text-main-text">{mainText}</div>

            {/* conditionally render subtext if present */}
            {subText && <div className="no-results-text-sub-text">{subText}</div>}
        </div>
    );
};

export default NoResultsView;
/*
Description: OverlayView component for use when any popup is displayed to make content below unclickable
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./OverlayView.css";

const OverlayView = ({handleClick}) => {
    return <div className="overlay" onClick={handleClick}></div>;
};

export default OverlayView;
/*
Description: SpinnerView component present when fetching API data - Maps and restaurants
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./SpinnerView.css";

const SpinnerView = () => {
    return (
        <div className="spinner-overlay">
            <div className="spin-container">
                <div className="spin" id="loader"></div>
                <span id="text">Loading...</span>
            </div>
        </div>
    );
};

export default SpinnerView;
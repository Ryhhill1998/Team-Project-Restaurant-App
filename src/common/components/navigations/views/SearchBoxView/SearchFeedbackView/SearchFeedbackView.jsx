/*
Description: SearchFeedbackView component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// stylesheet
import "./SearchFeedbackView.css";

// react imports
import {useEffect, useState} from "react";

// SearchFeedbackView component
const SearchFeedbackView = () => {

    // state variables - feedback style
    const [style, setStyle] = useState({opacity: 0});

    // function to fade feedback in and out
    useEffect(() => {
        updateStyle(1);

        setTimeout(() => updateStyle(0), 1500);
    }, []);

    // function to update style of feedback
    const updateStyle = (opacity) => {
        setStyle(style => {
            const updatedStyle = {...style};
            updatedStyle.opacity = opacity;
            return updatedStyle;
        });
    };

    return (
        <div className="no-matches-container" style={style}>
            <p className="no-matches-message">Oops! We didn't find a match</p>

            <p className="try-something-else-message">
                Why not try searching for something else?
            </p>
        </div>
    );
};

export default SearchFeedbackView;
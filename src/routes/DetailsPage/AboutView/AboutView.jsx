/*
 Description: This file contains the AboutView component, which is a sub-component of the DetailsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

//stylesheet
import "./AboutView.css";
// Imports
import {useState} from "react";

const AboutView = ({description}) => {
    // Declare state variables for the component
    const [isExpanded, setIsExpanded] = useState(false);
    const [toggleLabel, setToggleLabel] = useState('Read More');
    /// OnClick function to toggle the description
    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
        setToggleLabel(isExpanded ? 'Read More' : 'Read Less');
    };

    return (
        <div className="about-view">
            <h2>About</h2>

            <p>
                {description ? (
                    isExpanded ? (
                        description
                    ) : (
                        description.slice(0, 200) + (description.length > 100 ? '...' : '')
                    )
                ) : (
                    'No description available.'
                )}
            </p>

            {description.length > 200 && (
                <button
                    className="read-more-button"
                    onClick={handleToggleDescription}
                >
                    {toggleLabel}
                </button>
            )}
        </div>
    );
};

export default AboutView;
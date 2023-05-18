/*
Description: Generic button component for use throughout application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./ButtonView.css";

// fontawesome import
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Define default styles for different button sizes
const defaultStyles = {
    small: {
        padding: "0.35em 0.5em",
        fontSize: "0.9rem",
    },
    medium: {
        padding: "0.5em",
        fontSize: "1rem",
    },
    large: {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
    }
};

// ButtonView component
const ButtonView = ({
                    className,
                    children,
                    handleClick,
                    text,
                    icon,
                    size = "medium",
                    active = true,
                    type,
                    width,
                    margin
                }) => {

    // Calculate the button style based on the provided size, width, and margin
    const style = {...defaultStyles[size], width, margin};

    // Click handler for the button
    const clickHandler = () => {
        // handler only called if button is active
        if (active) {
            handleClick();
        }
    };

    return (
        <button
            style={style}
            className={`default-button ${className}`}
            onClick={clickHandler}
            type={type}
        >
            {text}

            {children}

            {/* Render the icon if provided */}
            {icon && <FontAwesomeIcon className="icon" icon={icon}/>}
        </button>
    );
};

export default ButtonView;
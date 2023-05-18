/*
Description: Primary button component built off generic ButtonView component for use throughout application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./PrimaryButtonView.css";

// import generic button component
import ButtonView from "../ButtonView/ButtonView";

// PrimaryButtonView component
const PrimaryButtonView = ({handleClick, children, text, icon, size, active, type, width, margin}) => {

    // Render the generic ButtonView component with specific props
    return (
        <ButtonView
            className="primary"
            children={children}
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
            width={width}
            margin={margin}
        />
    );
};

export default PrimaryButtonView;
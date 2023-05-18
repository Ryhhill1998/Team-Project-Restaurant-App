/*
Description: Secondary button component built off generic ButtonView component for use throughout application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./SecondaryButtonView.css";

// import generic button component
import ButtonView from "../ButtonView/ButtonView";

// SecondaryButtonView component
const SecondaryButtonView = ({handleClick, text, icon, size, active, type}) => {

    // Render the generic ButtonView component with specific props
    return (
        <ButtonView
            className="secondary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
        />
    );
};

export default SecondaryButtonView;
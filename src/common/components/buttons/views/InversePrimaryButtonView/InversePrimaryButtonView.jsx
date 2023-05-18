/*
Description: Inverse primary button component built off generic ButtonView component for use throughout application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./InversePrimaryButtonView.css";

// import generic button component
import ButtonView from "../ButtonView/ButtonView";

// InversePrimaryButtonView component
const InversePrimaryButtonView = ({handleClick, text, icon, size, active, type}) => {

    // Render the generic ButtonView component with specific props
    return (
        <ButtonView
            className="inverse-primary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
        />
    );
};

export default InversePrimaryButtonView;
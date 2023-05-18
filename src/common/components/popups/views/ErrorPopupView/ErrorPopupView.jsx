/*
Description: Error popup component - used whenever an error is displayed
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./ErrorPopupView.css";

// component imports
import PrimaryButtonView from "../../../buttons/views/PrimaryButtonView/PrimaryButtonView";

const ErrorPopupView = ({title, message, children, closePopup}) => {
    return (
        <div className="error-popup">
            {/* conditionally render title, message and children only if present in props */}
            {title && <p className="title">{title}</p>}

            {message && <p className="message">{message}</p>}

            {children}

            <PrimaryButtonView text="Close" handleClick={closePopup}/>
        </div>
    );
};

export default ErrorPopupView;
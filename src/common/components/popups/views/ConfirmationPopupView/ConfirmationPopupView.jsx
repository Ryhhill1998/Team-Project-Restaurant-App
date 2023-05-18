/*
Description: Confirmation popup component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./ConfirmationPopupView.css";

// component imports
import PrimaryButtonView from "../../../buttons/views/PrimaryButtonView/PrimaryButtonView";
import InversePrimaryButtonView from "../../../buttons/views/InversePrimaryButtonView/InversePrimaryButtonView";
import OverlayView from "../../../OverlayView/OverlayView";

const ConfirmationPopupView = ({message, handleYesClick, handleNoClick}) => {
    return (
        <>
            <div className="confirmation-popup">
                <p>{message}</p>

                <div className="buttons-container">
                    <PrimaryButtonView text="Yes" handleClick={handleYesClick}/>

                    <InversePrimaryButtonView
                        text="No"
                        handleClick={handleNoClick}
                    />
                </div>
            </div>

            <OverlayView/>
        </>
    );
};

export default ConfirmationPopupView;
/*
 Description: CheckInsCollage component rendered inside the CheckIns component
 Author: George Ball
 Contact: georgeball14@hotmail.com
 */

// stylesheet
import "./CheckInsCollage.css";
// Import comment components and necessary hooks
import CustomCollageView from "../../../common/components/CustomCollageView/CustomCollageView.jsx";
import {useEffect, useState} from "react";
import {
    addPhotoToCheckIn, deleteCheckInPhoto
} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import ProfileNavigationView from "../../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import UploadImagePopup from "../../../common/components/popups/containers/UploadImagePopup/UploadImagePopup";
import {selectSelectedCheckIn, setSelectedCheckIn, updateCheckIn} from "../../../features/checkIns/checkInsSlice";
import {faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter, faXmark} from "@fortawesome/free-solid-svg-icons";

// Define the 'CheckInsCollage' component
const CheckInsCollage = ({closePopup}) => {

    const dispatch = useDispatch();
    // Get the 'userId' and 'checkIn' from the Redux store
    const userId = useSelector(selectUserId);
    const checkIn = useSelector(selectSelectedCheckIn);

    // Declare state variables for the component
    const [restaurant, setRestaurant] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [addPhotoPopupIsVisible, setAddPhotoPopupIsVisible] = useState(false);
    const [selectMode, setSelectMode] = useState(false);

    // Use the 'useEffect' hook to update the component when 'checkIn' changes
    useEffect(() => {
        if (!checkIn) return;

        if (checkIn.photoData.length === 0) {
            setSelectMode(false);
        }

        setRestaurant(checkIn.restaurant);
    }, [checkIn]);

    // Define event handlers for various actions in the component

    const handleBackClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            closePopup();
        }, 300);
    };

    const handleAddClick = () => {
        setAddPhotoPopupIsVisible(true);
    };

    const handleClosePopupClick = () => {
        setAddPhotoPopupIsVisible(false);
        document.querySelector(".file-upload-input").value = "";
    };

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        const updatedCheckIn = await addPhotoToCheckIn(userId, checkIn, photoStoragePath);
        dispatch(updateCheckIn(updatedCheckIn));
        dispatch(setSelectedCheckIn(updatedCheckIn));

        document.querySelector(".file-upload-input").value = "";
        handleClosePopupClick();
    };

    const handleSelectClick = () => {
        setSelectMode(selectMode => !selectMode);
    };

    const handleDeleteSelected = async (selectedImages) => {
        if (!selectedImages?.length) return;

        const updatedCheckIn = {...checkIn};

        for (const image of selectedImages) {
            const deleted = await deleteCheckInPhoto(userId, image.id, checkIn.id);

            if (deleted) {
                updatedCheckIn.photoData = updatedCheckIn.photoData.filter(photo => photo.id !== image.id);
            }
        }

        dispatch(updateCheckIn(updatedCheckIn));
        dispatch(setSelectedCheckIn(updatedCheckIn));
    };

    // Render the 'CheckInsCollage' component
    return (
        <div className={`collage-popup ${isVisible ? "visible" : ""}`}>
            <div>
                {/* Render the 'ProfileNavigationView' component with appropriate props */}
                <ProfileNavigationView
                    pageTitle={restaurant?.name}
                    button1={{text: "Close", icon: faXmark, handler: handleBackClick}}
                    button2={checkIn.photoData?.length > 0 && {
                        text: selectMode ? "Cancel" : "Select",
                        handler: handleSelectClick
                    }}
                />

                {/* Render the 'CustomCollageView' component with appropriate props */}
                <div className="collage-popup-photos">
                    <div className="collage-popup-content">
                        <CustomCollageView
                            images={checkIn.photoData}
                            rows={100}
                            columns={2}
                            handleAddClick={handleAddClick}
                            selectMode={selectMode}
                            handleDeleteSelected={handleDeleteSelected}
                        />
                    </div>
                </div>
                {/* Render the 'UploadImagePopup' component if 'addPhotoPopupIsVisible' is true */}
                {addPhotoPopupIsVisible && (
                    <UploadImagePopup
                        handleCloseClick={handleClosePopupClick}
                        handleUploadClick={handleUploadPhotoClick}
                    />
                )}
            </div>
        </div>
    );
};

export default CheckInsCollage;

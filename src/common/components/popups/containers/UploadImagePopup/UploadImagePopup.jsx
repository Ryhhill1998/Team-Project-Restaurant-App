/*
Description: upload image popup component - used whenever an image is to be uploaded (reviews, edit profile, check-ins)
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./UploadImagePopup.css";

// react imports
import {useState} from "react";

// firebase imports
import {uploadImage} from "../../../../../firebase/firebase";

// component imports
import PrimaryButtonView from "../../../buttons/views/PrimaryButtonView/PrimaryButtonView";
import UploadFileButtonView from "../../../buttons/views/UploadFileButtonView/UploadFileButtonView";
import OverlayView from "../../../OverlayView/OverlayView";

const UploadImagePopup = ({handleCloseClick, handleUploadClick, shape = "rectangle"}) => {

    // state variables
    const [uploadButtonText, setUploadButtonText] = useState("Loading...");
    const [photoStoragePath, setPhotoStoragePath] = useState(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const [previewLoaded, setPreviewLoaded] = useState(false);
    const [uploadPercentageIsVisible, setUploadPercentageIsVisible] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    // handler function for preview load
    const handlePreviewLoad = () => {
        setUploadPercentageIsVisible(false); // percent completion hidden
        setPreviewLoaded(true); // preview loaded = true so img is displayed
        setUploadButtonText("Upload"); // button text now reads upload
    };

    // handler function for file change
    const handleFileChange = ({target}) => {
        const file = target.files[0]; // get file path
        setUploadPercentageIsVisible(true); // show percent completion
        const storageRef = uploadImage(file, setPhotoUrl, setUploadPercentage);
        setPhotoStoragePath(storageRef._location.path);
    };

    // handler for upload button clicked
    const handleUpload = () => {
        setUploadButtonText("Uploading..."); // show uploading state in button text
        handleUploadClick(photoUrl, photoStoragePath);
    };

    return (
        <>
            <div className="uploaded-image-popup">
                <div className="popup-header">
                    <button onClick={handleCloseClick}>
                        Close
                    </button>

                    <button style={{visibility: "hidden"}}>
                        Close
                    </button>
                </div>

                <h3>Select an image</h3>

                <div>
                    <div className={`uploaded-image-container ${shape}`}>
                        {/* show once img has loaded */}
                        {photoUrl && (
                            <img
                                src={photoUrl}
                                alt="image-preview"
                                style={{visibility: previewLoaded ? "visible" : "hidden"}}
                                onLoad={handlePreviewLoad}
                            />
                        )}

                        {uploadPercentageIsVisible && (
                            <div className="progress-display">{uploadPercentage} %</div>
                        )}
                    </div>

                    <UploadFileButtonView handleFileChange={handleFileChange}/>
                </div>

                {/* show once image has been uploaded to storage */}
                {photoUrl && (
                    <PrimaryButtonView
                        handleClick={handleUpload}
                        text={uploadButtonText}
                        active={previewLoaded}
                        type="button"
                    />
                )}
            </div>

            <OverlayView/>
        </>
    );
};

export default UploadImagePopup;
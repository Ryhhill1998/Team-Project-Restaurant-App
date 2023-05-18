/*
Description: Upload file button component used to upload images in application
Accepts only .png, .jpeg and .jpg files to reduce vulnerabilities
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./UploadFileButtonView.css";

// UploadFileButtonView component
const UploadFileButtonView = ({handleFileChange}) => {
    return (
        <input
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleFileChange}
            className="file-upload-input"
        />
    );
};

export default UploadFileButtonView;
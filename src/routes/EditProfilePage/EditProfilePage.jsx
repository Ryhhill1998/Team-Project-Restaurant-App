/*
 Description: This file contains the EditProfilePage component, which is a route component.
    It renders the edit profile page, which allows the user to edit their profile details.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

// stylesheet
import "./EditProfilePage.css";
// Imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDisplayName, selectEmail,
    selectPhone, selectProfilePhotoUrl,
    selectUserId, setDisplayName, setEmail, setPhone,
    setProfilePhotoUrl
} from "../../features/user/userSlice";
import UserIconView from "../../common/components/UserIconView/UserIconView";
import {deleteUserDocAndSignOut, updateUserProfile, updateUserProfilePhoto} from "../../firebase/firebase";
import FormFieldView from "../../common/components/FormFieldView/FormFieldView";
import PrimaryButtonView from "../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";
import UploadImagePopup from "../../common/components/popups/containers/UploadImagePopup/UploadImagePopup";
import SecondaryButtonView from "../../common/components/buttons/views/SecondaryButtonView/SecondaryButtonView";
import ConfirmationPopupView from "../../common/components/popups/views/ConfirmationPopupView/ConfirmationPopupView";

const defaultProfileFields = {
    displayName: "",
    email: "",
    phone: ""
};

const EditProfilePage = () => {

    const dispatch = useDispatch();
    // Get the 'userId', 'displayName', 'email', 'phone' and 'profilePhotoUrl' from the Redux store
    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const email = useSelector(selectEmail);
    const phone = useSelector(selectPhone);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);
    // useState hooks
    const [profileFields, setProfileFields] = useState(defaultProfileFields);
    const [uploadImagePopupIsVisible, setUploadImagePopupIsVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Save");
    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");
    const [photoStoragePath, setPhotoStoragePath] = useState("");
    const [confirmDeletePopupIsVisible, setConfirmDeletePopupIsVisible] = useState(false);
    const [errors, setErrors] = useState({});
    // useEffect hooks
    // Set the 'profileFields' state to the user's current profile details
    useEffect(() => {
        if (!displayName || profileFields.displayName) return;

        handleChange({target: {name: "displayName", value: displayName}});
    }, [displayName]);
    
    useEffect(() => {
        if (!email || profileFields.email) return;

        handleChange({target: {name: "email", value: email}});
    }, [email]);

    useEffect(() => {
        if (!phone || profileFields.phone) return;

        handleChange({target: {name: "phone", value: phone}});
    }, [phone]);

    // Function to validate the form fields
    const validateFields = () => {
        const newErrors = {};

        if (!(/^[0-9A-Za-z\s\-]+$/.test(profileFields.displayName))) {
            newErrors.displayName = "Display names can only contain letters and numbers.";
        }

        if (!(/^\S+@\S+\.\S+$/.test(profileFields.email))) {
            newErrors.email = "Invalid email format.";
        }

        if (profileFields.phone && !(/^\d+$/.test(profileFields.phone))) {
            newErrors.phone = "Phone number must contain only numbers."
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    // OnClick handler functions
    const handleSaveClick = async () => {
        if (!validateFields()) return;

        setButtonText("Saving...");

        if (uploadedPhotoUrl && photoStoragePath) {
            await updateUserProfilePhoto(userId, photoStoragePath);
            dispatch(setProfilePhotoUrl(uploadedPhotoUrl));
        }

        await updateUserProfile(userId, profileFields);

        dispatch(setDisplayName(profileFields.displayName));
        dispatch(setEmail(profileFields.email));
        dispatch(setPhone(profileFields.phone));

        setButtonText("Saved");
    };
    
    const handleChange = ({target}) => {
        setErrors({});

        const {name, value} = target;

        setProfileFields(profileFields => {
            const updatedFields = {...profileFields};
            updatedFields[name] = value;
            return updatedFields;
        });

        setButtonText("Save");
    };

    const handleCloseUploadImagePopup = () => {
        setUploadImagePopupIsVisible(false)
        document.querySelector(".file-upload-input").value = "";
    };

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        setUploadedPhotoUrl(photoUrl);
        setPhotoStoragePath(photoStoragePath);
        document.querySelector(".file-upload-input").value = "";
        handleCloseUploadImagePopup();
        setButtonText("Save");
    };

    const deleteAccount = async () => {
        await deleteUserDocAndSignOut(userId);
    };

    return (
        <div className="profile-container">
            <ProfileNavigationView pageTitle="Edit Profile"/>

           <main className="container">
               <section className="change-icon-section">
                   <div className="user-icon-container">
                       <UserIconView
                           size="xLarge"
                           imageUrl={uploadedPhotoUrl || profilePhotoUrl}
                       />

                       <button onClick={() => setUploadImagePopupIsVisible(true)}>
                           <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
                       </button>
                   </div>

                   {uploadImagePopupIsVisible && (
                       <UploadImagePopup
                           handleCloseClick={handleCloseUploadImagePopup}
                           handleUploadClick={handleUploadPhotoClick}
                           shape="round"
                       />
                   )}
               </section>

               <section className="change-details-section">
                   <FormFieldView
                       label="Display name"
                       type="text"
                       name="displayName"
                       value={profileFields.displayName}
                       onChangeHandler={handleChange}
                   />

                   {errors.displayName && <p className="error-message">{errors.displayName}</p>}

                   <FormFieldView
                       label="Email address"
                       type="email"
                       name="email"
                       value={profileFields.email}
                       onChangeHandler={handleChange}
                   />

                   {errors.email && <p className="error-message">{errors.email}</p>}

                   <FormFieldView
                       label="Phone number"
                       type="text"
                       name="phone"
                       value={profileFields.phone}
                       onChangeHandler={handleChange}
                   />

                   {errors.phone && <p className="error-message">{errors.phone}</p>}

                   <PrimaryButtonView
                       handleClick={handleSaveClick}
                       text={buttonText}
                       icon={buttonText === "Saved" ? faCircleCheck : null}
                       size="large"
                   />

                   <SecondaryButtonView
                       handleClick={() => setConfirmDeletePopupIsVisible(true)}
                       text="Delete account"
                       size="large"
                   />

                   {confirmDeletePopupIsVisible && (
                       <ConfirmationPopupView
                           message="Are you sure you want to delete your account?"
                           handleYesClick={deleteAccount}
                           handleNoClick={() => setConfirmDeletePopupIsVisible(false)}
                       />
                   )}
               </section>
           </main>
        </div>
    );
};

export default EditProfilePage;
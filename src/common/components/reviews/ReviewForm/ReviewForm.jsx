/*
Description: Review form for use in reviews displays
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// stylesheet
import './ReviewForm.css';

// react imports
import {forwardRef, useState} from 'react';

// firebase imports
import {
    addRestaurantReview,
    createNewRestaurantPhotoDoc,
    deleteRestaurantPhotoDoc,
    updateRestaurantReview
} from "../../../../firebase/firebase";

// redux imports
import {useDispatch} from "react-redux";
import {addReview, updateReview} from "../../../../features/reviews/reviewsSlice";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";

// component imports
import UploadImagePopup from "../../popups/containers/UploadImagePopup/UploadImagePopup";
import InteractiveStarRatingView from "../../StarRatingView/IntearactiveStarRatingView/InteractiveStarRatingView";
import InversePrimaryButtonView from "../../buttons/views/InversePrimaryButtonView/InversePrimaryButtonView";
import FormFieldView from "../../FormFieldView/FormFieldView";

// default values for form fields
const defaultFormFields = {
    rating: "",
    visitDate: new Date().toISOString().split("T")[0],
    title: "",
    content: "",
};

// forward ref from parent component
const ReviewForm = forwardRef((props, ref) => {

    // deconstruct props
    const {restaurant, userId, edit, reviewId, reviewData, closeForm} = props;

    // initialise dispatch
    const dispatch = useDispatch();

    // state variables
    const [addImagesPopUpIsVisible, setAddImagesPopupIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [uploadedPhotoId, setUploadedPhotoId] = useState(null);
    const [formData, setFormData] = useState(reviewData ? reviewData : defaultFormFields);
    const {rating, visitDate, title, content} = formData;

    // handler function for upload photo button clicked
    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        const photoId = await createNewRestaurantPhotoDoc(userId, restaurant.id, photoStoragePath);
        setUploadedPhotoId(photoId);
    };

    // function to validate form - returns false if errors exist and sets specific errors to display feedback
    const validateForm = (rating, visitDate, title, content) => {
        const newErrors = {};

        if (!visitDate) {
            newErrors.visitDate = 'Date of visit is required';
        }

        // makes sure that visit date can be no later than current date
        if (+new Date(visitDate) > +new Date()) {
            newErrors.visitDate = 'Date of visit cannot be in the future';
        }

        if (!rating || rating < 1 || rating > 10) {
            newErrors.rating = 'Rating is required';
        }

        if (!title || title.length < 5 || title.length > 50) {
            newErrors.title = "Title is required and must be between 5 and 50 characters";
        }

        if (!content || content.length < 10 || content.length > 500) {
            newErrors.review = 'Review is required and must be between 10 and 500 characters';
        }

        setErrors(newErrors);

        // check there are no errors
        return Object.keys(newErrors).length === 0;
    };

    // handler function for form submission
    const handleSubmit = async (event) => {
        // stop page reloading
        event.preventDefault();

        // deconstruct formData
        const {rating, visitDate, title, content} = formData;

        // check form is valid
        if (validateForm(rating, visitDate, title, content)) {
            const data = {rating: +rating, visitDate: +new Date(visitDate), title, content};

            // check if form use type is edit or new review
            if (edit) {
                const updatedData = {...data, photoId: uploadedPhotoId};
                const updatedReview = await updateRestaurantReview(reviewId, updatedData);
                dispatch(updateReview({reviewId, updatedReview: {...updatedReview}}));
                setFormData(defaultFormFields);
            } else {
                const newReview = await addRestaurantReview(userId, restaurant, data, uploadedPhotoId);
                dispatch(addReview({...newReview}));
            }

            setIsSubmitted(true);

            // close form after delay
            setTimeout(closeForm, 2000);
        }
    };

    // handler function for a field in the form changing value
    const handleChange = ({target}) => {
        const {name, value} = target;
        setFormData({...formData, [name]: value});
    };

    // handler function for star rating clicked
    const handleStarRatingClick = (value) => {
        handleChange({target: {name: 'rating', value}});
    };

    // handler function for closing popup
    const handleClosePopupClick = () => {
        setAddImagesPopupIsVisible(false);
        document.querySelector(".file-upload-input").value = "";
    };

    // handler function for clicking upload photo button
    const handlePhotoUpload = async (photoUrl, photoStoragePath) => {
        await handleUploadPhotoClick(photoUrl, photoStoragePath);
        document.querySelector(".file-upload-input").value = "";
        handleClosePopupClick();
    };

    // handler function for removing uploaded photo
    const handleRemovePhoto = async () => {
        await deleteRestaurantPhotoDoc(uploadedPhotoId);
        setUploadedPhotoId(null);
    };

    return (
        <div ref={ref} className="review-form">
            <form onSubmit={handleSubmit}>
                {/* show edit mode if in edit mode */}
                {edit && (
                    <h2 style={{margin: 0}}>
                        Editing
                        <FontAwesomeIcon icon={faPen} className="edit-icon"/>
                    </h2>
                )}

                {/* show add image popup when add image button clicked */}
                {addImagesPopUpIsVisible && (
                    <UploadImagePopup
                        handleCloseClick={handleClosePopupClick}
                        handleUploadClick={handlePhotoUpload}
                    />
                )}

                <div className="review-form-header">
                    <div className="interactive-rating-container">
                        <label>
                            Rating:
                            <InteractiveStarRatingView
                                rating={rating}
                                onClick={handleStarRatingClick}
                                interactive={true}
                            />
                        </label>
                    </div>

                    {/* show uploaded photo feedback and remove button if photo has been uploaded */}
                    {uploadedPhotoId ? (
                        <div className="upload-feedback-container">
                            <p>1 image uploaded</p>
                            <button type="button" onClick={handleRemovePhoto}>Remove</button>
                        </div>
                    ) : (
                        // show add photo button if no photo uploaded
                        <InversePrimaryButtonView
                            text="Add image"
                            type="button"
                            handleClick={() => setAddImagesPopupIsVisible(true)}
                        />
                    )}
                </div>

                {/* show errors if present */}
                {errors.rating && <p className="rating-error error">{errors.rating}</p>}

                <div>
                    <FormFieldView
                        label="Date of Visit:"
                        name="visitDate"
                        type="date"
                        value={visitDate}
                        onChangeHandler={handleChange}
                    />

                    {errors.visitDate && <p className="error">{errors.visitDate}</p>}
                </div>

                <div>
                    <FormFieldView
                        label="Title:"
                        name="title"
                        type="text"
                        value={title}
                        onChangeHandler={handleChange}
                    />

                    {errors.title && <p className="error">{errors.title}</p>}
                </div>

                <div>
                    <label>
                        Review:
                        <textarea name="content" value={content} onChange={handleChange}/>
                    </label>

                    {errors.review && <p className="error">{errors.review}</p>}
                </div>

                {!edit && <button className="review-submit" type="submit">Submit review</button>}

                {edit && (
                    <div className="buttons-container">
                        <button className="review-submit" type="submit">Save</button>
                        <button onClick={closeForm} type="button" className="cancel">Cancel</button>
                    </div>
                )}
            </form>

            {/* show feecback once form submitted */}
            {isSubmitted && (
                <div className="confirmation-overlay">
                    <h3>Thank you for your review!</h3>
                    <p>Your review has been submitted successfully.</p>
                </div>
            )}
        </div>
    );
});

export default ReviewForm;

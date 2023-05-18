/*
Description: Custom collage component used in the photos page and check-ins photos popup
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// Stylesheet
import "./CustomCollageView.css";

// fontawesome imports
import {faCircleCheck, faCirclePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// react imports
import {useEffect, useState} from "react";

// button component imports
import PrimaryButtonView from "../buttons/views/PrimaryButtonView/PrimaryButtonView";
import InversePrimaryButtonView from "../buttons/views/InversePrimaryButtonView/InversePrimaryButtonView";

// import collage image component
import CollageImageView from "./CollageImageView/CollageImageView";

// CustomCollageView component
const CustomCollageView = ({
                           images,
                           rows,
                           columns,
                           handleAddClick,
                           addFunctionality = true,
                           selectMode = false,
                           handleDeleteSelected
                       }) => {

    // State variables
    const [allImages, setAllImages] = useState(images);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectButtonText, setSelectButtonText] = useState("Select all");
    const [fullScreenImage, setFullScreenImage] = useState(null);

    // Update allImages when images prop changes
    useEffect(() => {
        setAllImages(images);
    }, [images]);

    // Reset selected images when select mode changes
    useEffect(() => {
        if (!selectMode) {
            setSelectedImages([]);
        }
    }, [selectMode]);

    // Handle image click for select mode
    const handleImageClick = (image) => {
        if (selectedImages.some(({id}) => id === image.id)) {
            setSelectedImages(selectedImages => selectedImages
                .filter(({id}) => id !== image.id));
        } else {
            setSelectedImages([...selectedImages, image]);
        }
    };

    // make image full screen when clicked and not in select mode
    const handleFullScreenClick = (image) => {
        setFullScreenImage(image);
    };

    // close image when clicked and in full screen mode
    const closeFullScreenPhoto = () => {
        setFullScreenImage("");
    };

    // handler for select all button clicked during select mode
    const handleSelectAllClick = () => {
        if (selectButtonText === "Select all") {
            setSelectedImages([...images]);
        } else {
            setSelectedImages([]);
        }
    };

    // Update select all button text
    useEffect(() => {
        if (selectedImages.length === images.length) {
            // show deselect all if all images selected
            setSelectButtonText("Deselect all");
        } else {
            // show select all if not all images selected
            setSelectButtonText("Select all");
        }
    }, [selectedImages]);

    // handle delete button clicked
    const handleDeleteClick = async () => {
        await handleDeleteSelected(selectedImages); // prop handle delete selected images function
        setSelectedImages([]); // reset selected images array
    };

    // render CustomCollageView component
    return (
        <>
            {selectMode && (
                <div className="container selection-header">
                    <PrimaryButtonView
                        handleClick={handleSelectAllClick}
                        text={selectButtonText}
                        size="small"
                    />

                    <h3>{selectedImages.length} image{selectedImages.length === 1 ? "" : "s"} selected</h3>

                    <InversePrimaryButtonView
                        handleClick={handleDeleteClick}
                        text="Delete"
                        icon={faTrash}
                        size="small"
                    />
                </div>
            )}

            <div
                className="collage-container"
                style={{gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)`}}
            >
                {addFunctionality && !selectMode && (
                    <button className="add-photo-button" onClick={handleAddClick}>
                        <FontAwesomeIcon className="icon" icon={faCirclePlus}/>
                    </button>
                )}

                {allImages && allImages
                    .slice(0, rows * columns - 1)
                    .map(image => (
                        <div
                            key={image.id}
                            className={`collage-image-wrapper ${selectMode ? "clickable" : ""}`}
                            onClick={() => {
                                handleImageClick(image);

                                if (!selectMode) {
                                    handleFullScreenClick(image);
                                }
                            }}
                        >
                            <CollageImageView {...image}/>

                            {selectMode && (
                                <button
                                    className={`select-image-button 
                                    ${selectedImages.some(({alt}) => alt === image.alt) ?
                                        "selected"
                                        :
                                        ""}`
                                    }
                                >
                                    <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                                </button>
                            )}
                        </div>
                    ))
                }

                {fullScreenImage && (
                    <div className="full-screen-image-wrapper" onClick={closeFullScreenPhoto}>
                        <img src={fullScreenImage.url} alt="Full screen check-in image"/>
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomCollageView;

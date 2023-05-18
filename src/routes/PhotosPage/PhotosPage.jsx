/*
 Description: Photos page component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // stylesheet
import "./PhotosPage.css";
// Import dependencies
import CustomCollageView from "../../common/components/CustomCollageView/CustomCollageView";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {getAllRestaurantPhotosByUserId} from "../../firebase/firebase";
import ProfileNavigationView from "../../common/components/navigations/views/ProfileNavigationView/ProfileNavigationView";

const PhotosPage = () => {
    // Get the 'userId' from the Redux store
    const userId = useSelector(selectUserId);
    // useState hooks
    const [allPhotos, setAllPhotos] = useState(null);
    const [display, setDisplay] = useState("Uploaded");

    // Get all photos on page load
    useEffect(() => {
        if (!userId) return;

        getAllRestaurantPhotosByUserId(userId)
            .then(data => setAllPhotos(data))
    }, [userId]);

    // Change display to uploaded or tagged
    const changeDisplay = () => {
        setDisplay(display => display === "Uploaded" ? "Tagged" : "Uploaded");
    };

    // Delete selected photos
    const handleDeleteSelected = async (selectedImages) => {
        if (!selectedImages?.length) return;

        let updatedPhotos = [...allPhotos];

        // find check in and delete photo

        setAllPhotos(updatedPhotos);
    };

    return (
        <div className="photos-page-container">
            <ProfileNavigationView
                pageTitle="Photos"
                lowerNav={true}
                toggleDisplayText={display === "Tagged" ? "Uploaded" : "Tagged"}
                toggleHandler={changeDisplay}
                count={display === "Tagged" ?
                    (allPhotos?.uploadedPhotos?.length ? allPhotos?.uploadedPhotos?.length : 0)
                    :
                    (allPhotos?.taggedPhotos?.length ? allPhotos?.taggedPhotos?.length : 0)
                }
            />

            <main>
                {display === "Uploaded" && allPhotos?.uploadedPhotos && (
                    <div className="collage-popup-photos collage-popup-photos-expanded">
                        <CustomCollageView
                            images={allPhotos.uploadedPhotos}
                            rows={100}
                            columns={2}
                            addFunctionality={false}
                            handleDeleteSelected={handleDeleteSelected()}
                        />
                    </div>
                )}

                {display === "Tagged" && allPhotos?.taggedPhotos && (
                    <div className="collage-popup-photos collage-popup-photos-expanded">
                        <CustomCollageView
                            images={allPhotos.taggedPhotos}
                            rows={100}
                            columns={2}
                            addFunctionality={false}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default PhotosPage;
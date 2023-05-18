/*
Description: Collage image component for use inside the custom collage component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import './CollageImageView.css';

// react imports
import {useState} from "react";

// CollageImageView component
const CollageImageView = ({url, alt}) => {

    // check if img is loaded in state
    const [loaded, setLoaded] = useState(false);

    return (
        // only display the image if it has loaded
        <img
            style={{visibility: loaded ? "visible" : "hidden"}}
            src={url}
            alt={alt}
            className="collage-image"
            onLoad={() => setLoaded(true)}
        />
    );
};

export default CollageImageView;
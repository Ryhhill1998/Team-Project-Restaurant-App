/*
Description: User icon component for use when show user interactions - profile pages, reviews, check-ins
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./UserIconView.css";

// fontawesome imports
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// react imports
import {useState} from "react";

// styles map to get styles based on size prop
const stylesMap = {
    xSmall: {height: "30px", width: "30px", borderWidth: "2px"},
    small: {height: "40px", width: "40px", borderWidth: "2px"},
    medium: {height: "50px", width: "50px", borderWidth: "2px"},
    large: {height: "60px", width: "60px", borderWidth: "3px"},
    larger: {height: "70px", width: "70px", borderWidth: "4px"},
    xLarge: {height: "100px", width: "100px", borderWidth: "5px"},
};

const UserIconView = ({size, imageUrl = null}) => {

    // state variables - check img is loaded
    const [imageIsLoaded, setImageIsLoaded] = useState(false);

    // get style from map based on size prop
    const style = stylesMap[size];

    return (
        <div className="user-icon" style={style}>
            {/* render conditionally if image url passed in */}
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="user-icon"
                    loading="lazy"
                    onLoad={() => setImageIsLoaded(true)}
                    style={{visibility: imageIsLoaded ? "visible" : "hidden"}}
                />
            ) : (
                <FontAwesomeIcon className="icon" icon={faUser}/>
            )}
        </div>
    );
};

export default UserIconView;
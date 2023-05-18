/*
 Description: This file contains the ImageAndInfoView component, which is a sub-component of the DetailsPage component.
 It displays the restaurant's name, photo, star rating, price, address, phone number, and open status.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 //stylesheet
import "./ImageAndInfoView.css";
//Imports
import CheckInButton from "./CheckInButton/CheckInButton";
import StarRatingView from "../../../common/components/StarRatingView/StarRatingView";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import {forwardRef} from "react";

const ImageAndInfoView = forwardRef((props, ref) => {
// Get props
    const {
        name,
        photoUrl,
        starRating,
        price,
        priceLevel,
        formattedAddress,
        phone,
        isOpen,
        restaurant,
        updateInteractions
    } = props;

    return (
        <div className="image-and-info-container">
            <div className="backdrop" style={{backgroundImage: `url(${photoUrl})`}}></div>

            <div className="restaurant-info">
                <div className="title-container">
                    <h1 ref={ref}>{name}</h1>

                    <CheckInButton restaurant={restaurant} updateInteractions={updateInteractions}/>
                </div>

                <StarRatingView rating={starRating}/>

                <div className="price">
                    <p>{priceLevel !== null ? priceLevel : price}</p>
                </div>

                <div className="address info">
                    <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                    <p>{formattedAddress}</p>
                </div>

                {phone && (
                    <div className="phone info">
                        <FontAwesomeIcon icon={faPhone} className="icon"/>
                        <p>{phone}</p>
                    </div>
                )}

                <div className="open-status">{isOpen ? 'Open Now' : 'Closed'}</div>

            </div>
        </div>
    );
});

export default ImageAndInfoView;
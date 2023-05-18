/*
 Description: This file contains the AdditionalDetail component, 
 which is a sub-component of the AdditionalDetailsView component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 //stylesheet
import "./AdditionalDetail.css";
//Imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AdditionalDetail = ({icon, name, content}) => {
    return (
        <div className="additional-detail">
            <FontAwesomeIcon icon={icon}/>
            <span>{name}</span>
            <p>{content}</p>
        </div>
    );
};

export default AdditionalDetail;
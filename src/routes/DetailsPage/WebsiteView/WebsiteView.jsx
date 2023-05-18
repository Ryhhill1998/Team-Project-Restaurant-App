/*
 Description: This file contains the WebsiteView component, which is a sub-component of the DetailsPage component.
    It renders the website section of the DetailsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./WebsiteView.css";
// Imports
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const WebsiteView = ({url}) => {

    const getDomainName = (url) => {
        try {
            const {hostname} = new URL(url);
            return hostname;
        } catch (error) {
            console.error('Error parsing URL', error);
            return url;
        }
    };

    return (
        <div className="website-view">
            <h2>Website</h2>
{/*Render a link to the website, with the domain name as the text and an icon to the right*/}
            <Link to={url}>
                {getDomainName(url)}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon"/>
            </Link>
        </div>
    );
};

export default WebsiteView;
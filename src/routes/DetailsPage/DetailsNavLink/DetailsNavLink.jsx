/*
 Description: This file contains the DetailsNavLink component, which is a sub-component of the DetailsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

const DetailsNavLink = ({active, handleClick, text}) => {
    return (
        <button className={active ? "active" : ""} onClick={() => handleClick(text)}>
            {text}
        </button>
    );
};

export default DetailsNavLink;
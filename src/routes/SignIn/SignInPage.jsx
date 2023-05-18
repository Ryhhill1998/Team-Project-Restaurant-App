/*
 Description: Sign in page component. This component is rendered in the SignIn route.
 Author: George Ball
 Contact: georgeball14@hotmail.com
 */
// stylesheet
import "./SignInPage.css";
// Import dependencies
import FormFieldView from "../../common/components/FormFieldView/FormFieldView";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../firebase/firebase";
import {setUserDetails} from "../../features/user/userSlice";
import { useState } from "react";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PrimaryButtonView from "../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";

const SignInPage = () => {

    const dispatch = useDispatch();
    // Declare state variables for the component
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [signInButtonText, setSignInButtonText] = useState("Sign in");
    const [googleSignInText, setGoogleSignInText] = useState("Sign in with Google");

    // Handle sign in button click via Email and Password
    const handleEmailAndPasswordSignIn = async () => {
        try {
            setSignInButtonText("Signing in...");
            const userDetails = await signInAuthUserWithEmailAndPassword(email, password);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing in with email and password", error);
            setErrorMessage("The account with that email and password could not be found. " +
                "Please check your details and try again.");
        } finally {
            setSignInButtonText("Sign in");
        }
    };

    // Handle sign in button click via Google
    const handleGoogleSignInClick = async () => {
        try {
            setGoogleSignInText("Signing in...");
            const userDetails = await signInWithGooglePopup();
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    // const handleFacebookSignInClick = async () => {
    //     try {
    //         const userDetails = await signInWithFacebookPopup();
    //         dispatch(setUserDetails(userDetails));
    //     } catch (error) {
    //         console.error("Error signing up with Facebook: ", error);
    //     }
    // };

    // Handle email input change
    const handleEmailChange = ({target}) => {
        setErrorMessage("");
        setEmail(target.value);
    };

    // Handle password input change
    const handlePasswordChange = ({target}) => {
        setErrorMessage("");
        setPassword(target.value);
    };

    return (
        <div className="signin-container">
            <h1>Sign In</h1>

            <form className="signin-form">
                <FormFieldView
                    label="Email"
                    type="email"
                    value={email}
                    onChangeHandler={handleEmailChange}
                />

                <FormFieldView
                    label="Password"
                    type="password"
                    value={password}
                    onChangeHandler={handlePasswordChange}
                />

                {errorMessage && <div className="signin-error-message">{errorMessage}</div>}

                <PrimaryButtonView
                    text={signInButtonText}
                    type="button"
                    handleClick={handleEmailAndPasswordSignIn}
                />
            </form>

            <div className="signin-page-signup">
                <p>Don't have an account?
                    <Link to="/sign-up" className="signup-link"> Sign up.</Link>
                </p>
            </div>

            <div className="signin-page-separator">
                <span>OR</span>
                
            </div>

            <div className="signin-google">
                <button className="auth-button-google" onClick={handleGoogleSignInClick}>
                    <FontAwesomeIcon icon={faGoogle} className="icon"/>
                    <span className="google">{googleSignInText}</span>
                </button>
            </div>

            {/*<div className="signin-facebook">*/}
            {/*    <button className="auth-button-facebook" onClick={handleFacebookSignInClick}>*/}
            {/*        <img src="/facebook.png" alt="Facebook logo"/>*/}
            {/*        <span>Sign in with Facebook</span>*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
}

export default SignInPage;

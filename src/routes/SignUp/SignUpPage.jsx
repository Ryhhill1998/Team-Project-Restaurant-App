/*
 Description: Sign up page component. This component is rendered in the SignUp route.
 Author: George Ball
 Contact: georgeball14@hotmail.com
 */
// stylesheet
import "./SignUpPage.css";
// Import dependencies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {signUpAuthUserWithEmailAndPassword} from "../../firebase/firebase";
import FormFieldView from "../../common/components/FormFieldView/FormFieldView";
import {setUserDetails} from "../../features/user/userSlice";
import {useDispatch} from "react-redux";
import PrimaryButtonView from "../../common/components/buttons/views/PrimaryButtonView/PrimaryButtonView";

const SignUpPage = () => {

    const dispatch = useDispatch();

    // Declare state variables for the component
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({}); // finish implementation
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [signUpButtonText, setSignUpButtonText] = useState("Sign up");

    // Check if passwords match
    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordMismatch(password !== confirmPassword);
        }
    }, [password, confirmPassword]);

    // Validate form fields
    const validateFields = () => {
        const newErrors = {};

        if (!displayName) {
            newErrors.displayName = "You must have a display name";
        }

        if (!(/^\S+@\S+\.\S+$/.test(email))) {
            newErrors.email = "Invalid email format";
        }

        if (password.length < 6) {
            newErrors.password = "Passwords must contain at least 6 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            setPasswordMismatch(true);
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Handle sign up button click
    const handleSignUp = async () => {
        if (!validateFields()) return;

        setPasswordMismatch(false);

        try {
            setSignUpButtonText("Signing up...");
            const userDetails = await signUpAuthUserWithEmailAndPassword(displayName, email, password);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            let errorMessage;
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                errorMessage = "That email address is already registered to another account. Try signing in instead.";
            } else {
                errorMessage = "Error signing up. Please try again.";
            }

            setErrors(errors => {
                const updatedErrors = {...errors};
                updatedErrors.email = errorMessage;
                return updatedErrors;
            });
        } finally {
            setSignUpButtonText("Sign up");
        }
    };

    // Event handlers...
    const handleDisplayNameChange = ({target}) => {
        setErrors({});
        setDisplayName(target.value);
    };

    const handleEmailChange = ({target}) => {
        setErrors({});
        setEmail(target.value);
    };

    const handlePasswordChange = ({target}) => {
        setErrors({});
        setPassword(target.value);
    };

    const handleConfirmPasswordChange = ({target}) => {
        const {value} = target;

        setErrors({});
        setConfirmPassword(value);
        setPasswordMismatch(value !== password);
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>

            <form className="signup-form">
                <FormFieldView
                    label="Display name"
                    type="text"
                    value={displayName}
                    onChangeHandler={handleDisplayNameChange}
                />

                {errors.displayName && <p className="error-message">{errors.displayName}</p>}

                <FormFieldView
                    label="Email"
                    type="email"
                    value={email}
                    onChangeHandler={handleEmailChange}
                />

                {errors.email && <p className="error-message">{errors.email}</p>}

                <FormFieldView
                    label="Password"
                    type="password"
                    value={password}
                    onChangeHandler={handlePasswordChange}
                />

                {errors.password && <p className="error-message">{errors.password}</p>}

                <FormFieldView
                    label="Confirm password"
                    type="password"
                    className={`signup-input ${
                        passwordMismatch 
                        ? "error-border" 
                        : (confirmPassword && !passwordMismatch ?
                         "success-border"
                        : "")
                    }`}
                    value={confirmPassword}
                    onChangeHandler={handleConfirmPasswordChange}
                />

                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

                <PrimaryButtonView
                    text={signUpButtonText}
                    type="button"
                    handleClick={handleSignUp}
                />
            </form>

            <div className="signup-page-signin">
                <p>Already have an account?
                    <Link to="/sign-in" className="signin-link"> Sign in.</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;

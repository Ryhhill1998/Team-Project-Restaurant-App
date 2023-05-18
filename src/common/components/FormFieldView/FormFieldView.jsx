/*
Description: Form field component for use throughout the application in all input style components
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./FormFieldView.css";

// FormFieldView component
const FormFieldView = ({
                       label,
                       placeholder,
                       name,
                       type,
                       value,
                       onChangeHandler,
                       className,
                       onKeyDown,
                       padding,
                       onFocus,
                       onBlur,
                   }) => {

    // gives default padding if value not provided as prop
    const style = {
        padding: padding || "0.5em"
    };

    // render form field component
    return (
        <label className="form-field">
            {label}

            <input
                style={style}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                className={className}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </label>
    );
};

export default FormFieldView;
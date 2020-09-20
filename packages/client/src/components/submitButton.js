import React from "react";
import './submitButton.css';

const SubmitButton = (props) => {
    return (
        <div className="submit_button">{props.text}</div>
    )
};

export default SubmitButton;

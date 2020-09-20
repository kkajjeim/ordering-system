import React from "react";
import './formLabel.css';

const FormLabel = (props) => {
    return (
        <div className="form_label">{props.text}</div>
    )
};

export default FormLabel;

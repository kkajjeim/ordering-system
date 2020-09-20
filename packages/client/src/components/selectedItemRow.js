import React from "react";
import './selectedItemRow.css';

const SelectedItemRow = ({i, name, quantity, price, handleItem}) => {
    const handleClick = (e) => {
        const action = e.target.getAttribute('name');
        handleItem(action, i);
    };

    return (
        <div className="item">
            <span className="item_name">{name}</span>
            <span className="item_quantity">x {quantity}</span>
            <span className="item_price">= {quantity * price}</span>
            <span className="item_buttons">
                <i className="fas fa-times"
                   onClick={handleClick}
                   name="delete"
                ></i>
                <i className="fas fa-caret-square-down"
                   onClick={handleClick}
                   name="minus"></i>
                <i className="fas fa-caret-square-up"
                   onClick={handleClick}
                   name="plus"></i>
            </span>
        </div>
    )
};

export default SelectedItemRow;

import React from "react";
import './menuCard.css';

const MenuCard = ({i, image, name, price, handleAddToBasket}) => {
    const handleClick = (e) => {
        handleAddToBasket(i);
    };

    return (
        <div className="menu_card">
            <img src={image} />
            <div className="menu_info">
                <span className="menu_button_overlay" onClick={handleClick}>
                    <i className="fas fa-cart-plus"></i>
                </span>
                <div className="menu_info_name">{name}</div>
                <div className="menu_info_price">{price} ₩</div>
            </div>
        </div>
    )
};

export default MenuCard;

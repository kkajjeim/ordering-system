import React from "react";
import './historyCard.css';
import { getDateStr } from '../helper/util';

const HistoryCard = ({id, index, createdAt, cancelledAt, products, total, handleCancel}) => {
    const status = cancelledAt ? 'cancelled' : 'packing';
    const orderDateStr = getDateStr(createdAt);
    const unit = products.length > 1 ? 'items' : 'item';
    const orderName = products.map(p => p.name).join();
    const line = index ? "inner_line" : "none";

    const handleClick = (e) => {
        handleCancel(id);
    };

    return (
        <div className={"history_card " + status}>
            <div className={line}></div>
            <div className={"history_order_number " + status}>Order number: {id}</div>
            <div className={"history_date " + status}>Date: {orderDateStr}</div>
            <div className={"history_count " + status}>{products.length} {unit}</div>
            <div className={"history_total " + status}>{total} ₩</div>
            <div className={"history_items " + status}>{orderName}</div>
            <div className={"history_status " + status}>{status.toUpperCase()}</div>
            <div className={"history_cancel " + status} onClick={handleClick}>
                {cancelledAt ? getDateStr(cancelledAt) : "cancel"}</div>
        </div>
    )
};

export default HistoryCard;
